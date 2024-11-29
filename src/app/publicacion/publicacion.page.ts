import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'; // Para URLs seguras
import { FirebaseLoginService } from '../servicios/firebase-login.service'; 
import { User } from '@firebase/auth'; 
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.page.html',
  styleUrls: ['./publicacion.page.scss'],
})
export class PublicacionPage implements OnInit {
  comentario: string = "";
  receta: any = {}; 
  ingredientes: string[] = [];
  titulo: string = "";
  postId: string = "";
  uid: string = "";
  imagen: string = ""; 
  publicacionGuardada: boolean = false;  // Nueva variable para controlar si la publicación está guardada

  constructor(
    public mensaje: ToastController,
    private route: Router,
    public alerta: AlertController,  // Inyecta el servicio de AlertController
    private sanitizer: DomSanitizer, 
    private firebaseLoginService: FirebaseLoginService,
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
  ) {}

  ngOnInit() {
    const recetaGuardada = localStorage.getItem('recetaSeleccionada');
    if (recetaGuardada) {
      this.receta = JSON.parse(recetaGuardada);
      this.postId = this.receta?.idPublicacion;
      this.imagen = this.receta?.imagen || '';
    }

    this.firebaseLoginService.getCurrentUser().subscribe(async (user: User | null) => {
      if (user) {
        this.uid = user.uid;
        this.obtenerPublicacion();
      } else {
        console.log('Usuario no encontrado');
      }
    });
  }

  async obtenerPublicacion() {
    if (this.uid && this.postId) {
      try {
        const publicacionesQuery = await this.firestore
          .collection('publicaciones', ref => ref.where('idPublicacion', '==', this.postId))
          .get()
          .toPromise();

        if (publicacionesQuery && !publicacionesQuery.empty) {
          const publicacionData = publicacionesQuery.docs[0].data();
          // Aquí puedes usar publicacionData para lo que necesites
        } else {
          console.log('No se encontró la publicación con el idPublicacion:', this.postId);
        }

        // Verifica si la publicación está guardada en el perfil del usuario
        await this.verificarPublicacionGuardada();

      } catch (error) {
        console.error('Error al obtener la publicación:', error);
      }
    } else {
      console.log('No se tiene el UID o el postId disponible');
    }
  }

  // Función para verificar si la publicación ya está guardada
  async verificarPublicacionGuardada() {
    if (this.uid && this.postId) {
      try {
        const userRef = this.firestore.collection('users').doc(this.uid);
        const userDoc = await userRef.get().toPromise();
        if (userDoc && userDoc.exists) {
          const userData = userDoc.data() as { publicacionesGuardadas?: any[] };
          const publicacionesGuardadas = Array.isArray(userData?.publicacionesGuardadas) ? userData.publicacionesGuardadas : [];
          
          // Comprobar si la publicación ya está guardada
          this.publicacionGuardada = publicacionesGuardadas.some((pub: any) => pub.idPublicacion === this.postId);
        }
      } catch (error) {
        console.error('Error al verificar la publicación guardada:', error);
      }
    }
  }

  // Función para guardar o eliminar la publicación
  async guardarPublicacion() {
    if (this.uid && this.postId) {
      try {
        const publicacionesQuery = await this.firestore
          .collection('publicaciones', ref => ref.where('idPublicacion', '==', this.postId))
          .get()
          .toPromise();

        if (publicacionesQuery && !publicacionesQuery.empty) {
          const publicacionData = publicacionesQuery.docs[0].data();
          const userRef = this.firestore.collection('users').doc(this.uid);
          const userDoc = await userRef.get().toPromise();

          if (userDoc && userDoc.exists) {
            const userData = userDoc.data() as { publicacionesGuardadas?: any[] };
            const publicacionesGuardadas = Array.isArray(userData?.publicacionesGuardadas) ? userData.publicacionesGuardadas : [];
            
            // Si la publicación ya está guardada, la eliminamos
            if (this.publicacionGuardada) {
              const index = publicacionesGuardadas.findIndex((pub: any) => pub.idPublicacion === this.postId);
              if (index !== -1) {
                publicacionesGuardadas.splice(index, 1); // Eliminar publicación del array
                await userRef.update({
                  publicacionesGuardadas: publicacionesGuardadas,
                });
                this.publicacionGuardada = false; // Cambiar el estado del botón a "Guardar"
                this.MensajeEliminada();
              }
            } else {
              // Si la publicación no está guardada, la guardamos
              publicacionesGuardadas.push(publicacionData);
              await userRef.update({
                publicacionesGuardadas: publicacionesGuardadas,
              });
              this.publicacionGuardada = true; // Cambiar el estado del botón a "Guardada"
              this.MensajeGuardada();
            }
          }
        } else {
          this.MostrarAlerta('No se encontró la publicación para guardar.');
        }
      } catch (error) {
        console.error('Error al guardar o eliminar la publicación:', error);
        this.MensajeGuardadoError();
      }
    } else {
      console.log('No se tiene el UID o el postId disponible');
    }
  }

  // Función para mostrar un mensaje cuando la publicación es guardada
  async MensajeGuardada() {
    const toast = await this.mensaje.create({
      message: 'Publicación guardada',
      duration: 2000,
    });
    toast.present();
  }

  // Función para mostrar el mensaje cuando la publicación es eliminada de los guardados
  async MensajeEliminada() {
    const toast = await this.mensaje.create({
      message: 'Publicación eliminada de tus guardados',
      duration: 2000,
    });
    toast.present();
  }

  // Función para mostrar un mensaje de error al intentar guardar o eliminar la publicación
  async MensajeGuardadoError() {
    const toast = await this.mensaje.create({
      message: 'Error al guardar o eliminar la publicación',
      duration: 2000,
    });
    toast.present();
  }

  // Función para mostrar una alerta en caso de que haya un problema
  async MostrarAlerta(mensaje: string) {
    const alerta = await this.alerta.create({
      header: 'Información',
      message: mensaje,
      buttons: ['OK'],
    });
    alerta.present();
  }
}
