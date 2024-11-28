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
  receta: any = {}; // Variable para almacenar la receta seleccionada
  ingredientes: string[] = [];
  titulo: string = "";
  postId: string = "";
  uid: string = "";
  imagen: string = ""; // Nuevo campo para la imagen
  

  constructor(
    public mensaje: ToastController,
    private route: Router,
    public alerta: AlertController,
    private sanitizer: DomSanitizer, // Inyectamos el servicio para sanitizar URLs
    private firebaseLoginService: FirebaseLoginService,
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
  
  ) {}


  ngOnInit(){
    const recetaGuardada = localStorage.getItem('recetaSeleccionada');
    if (recetaGuardada) {
      this.receta = JSON.parse(recetaGuardada); // Recuperar la receta
      this.postId = this.receta?.idPublicacion;
      this.imagen = this.receta?.imagen || ''; // Asegúrate de que `imagen` sea el campo que contiene el Base64
      console.log(this.imagen); // Confirmar que se recuperó correctamente
    }
  
    this.firebaseLoginService.getCurrentUser().subscribe(async (user: User | null) => {
      if (user) {
        this.uid = user.uid;
      }
    });
  }

  // Función para sanitizar el enlace de YouTube
  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url.replace('watch?v=', 'embed/'));
  }

  async mensajeLike() {
    const toast = await this.mensaje.create({
      message: 'Publicación añadida a favoritos',
      duration: 2000,
    });
    toast.present();
  }

  async MensajeGuardada() {
    const toast = await this.mensaje.create({
      message: 'Publicación guardada',
      duration: 2000,
    });
    toast.present();
  }

  async MensajeComentario() {
    const toast = await this.mensaje.create({
      message: 'Comentario Enviado',
      duration: 2000,
    });
    toast.present();
  }

  async MensajeComentarioError() {
    const toast = await this.mensaje.create({
      message: 'No se puede enviar un comentario vacío',
      duration: 2000,
    });
    toast.present();
  }

  async MensajeGuardadoError() {
    const toast = await this.mensaje.create({
      message: 'Error al guardar la publicación',
      duration: 2000,
    });
    toast.present();
  }

  Like() {
    this.mensajeLike();
  }

  Comentar() {
    if (this.comentario === "") {
      this.MensajeComentarioError();
    } else {
      this.MensajeComentario();
    }
  }

  async guardarPublicacion(): Promise<void> {
    if (this.uid) {
      if (this.postId && this.uid) {
        // Llama al método del servicio para guardar la publicación
        this.firebaseLoginService.agregarPublicacionGuardada(this.uid, this.postId)
          .then(() => {
            this.MensajeGuardada()
            console.log('Publicación guardada exitosamente');
          })
          .catch((error) => {
            this.MensajeGuardadoError
            console.error('Error al guardar la publicación', error);
          });
      } else {
        console.log('No se ha encontrado el ID de la receta o el UID del usuario');
      }
    }}






}