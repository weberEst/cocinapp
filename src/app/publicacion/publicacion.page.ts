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


  ngOnInit() {
    // Recuperar receta desde localStorage
    const recetaGuardada = localStorage.getItem('recetaSeleccionada');
    if (recetaGuardada) {
      this.receta = JSON.parse(recetaGuardada); // Recuperar la receta
      this.postId = this.receta?.idPublicacion; // Esto no es el docId, es el idPublicacion que estás guardando, pero lo utilizamos para buscar
      this.imagen = this.receta?.imagen || ''; // Asegúrate de que `imagen` sea el campo que contiene el Base64
      console.log('Imagen recuperada:', this.imagen); // Confirmar que se recuperó correctamente
      console.log('esta es la receta:',this.receta)
    }
  
    // Suscripción al usuario actual y espera a que el uid esté disponible
    this.firebaseLoginService.getCurrentUser().subscribe(async (user: User | null) => {
      if (user) {
        this.uid = user.uid; // Asigna el UID del usuario
        console.log('Usuario UID:', this.uid); // Confirmación de que se ha asignado correctamente
        this.obtenerPublicacion(); // Llamada a la función después de que el uid esté disponible
      } else {
        console.log('Usuario no encontrado');
      }
    });
  }
  
  
  async obtenerPublicacion() {
    if (this.uid && this.postId) {
      try {
        // Verifica que el postId es el esperado
        console.log('Buscando publicación con ID:', this.postId);
  
        // Buscar el documento donde el campo `idPublicacion` sea igual al `postId`
        const publicacionesQuery = await this.firestore
          .collection('publicaciones', ref => ref.where('idPublicacion', '==', this.postId))
          .get()
          .toPromise();
  
        // Verificación de si la consulta fue exitosa
        if (publicacionesQuery && !publicacionesQuery.empty) {
          // Si se encuentra la publicación, extraemos los datos del primer documento encontrado
          const publicacionData = publicacionesQuery.docs[0].data();
          const docId = publicacionesQuery.docs[0].id;
          
          console.log('Publicación encontrada:', publicacionData);
          console.log('ID del documento en Firestore:', docId); // Mostrar el docId
  
          // Aquí puedes usar la `publicacionData` para lo que necesites
        } else {
          console.log('No se encontró la publicación con el idPublicacion:', this.postId);
        }
      } catch (error) {
        console.error('Error al obtener la publicación:', error);
      }
    } else {
      console.log('No se tiene el UID o el postId disponible');
    }
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


  async guardarPublicacion() {
  if (this.uid && this.postId) {
    try {
      // Obtener la publicación que se va a guardar
      const publicacionesQuery = await this.firestore
        .collection('publicaciones', ref => ref.where('idPublicacion', '==', this.postId))
        .get()
        .toPromise();

      if (publicacionesQuery && !publicacionesQuery.empty) {
        const publicacionData = publicacionesQuery.docs[0].data();

        // Obtener el documento del usuario
        const userRef = this.firestore.collection('users').doc(this.uid);
        const userDoc = await userRef.get().toPromise();

        // Verificar que el documento del usuario existe
        if (userDoc && userDoc.exists) {  // Verificamos tanto que userDoc no es null como que existe
          const userData = userDoc.data() as { publicacionesGuardadas?: any[] }; // Especificamos el tipo de userData

          // Comprobar que publicacionesGuardadas es un array o inicializarlo como array vacío
          const publicacionesGuardadas = Array.isArray(userData?.publicacionesGuardadas) 
            ? userData.publicacionesGuardadas 
            : []; 

          // Verificar si la publicación ya está guardada para evitar duplicados
          if (!publicacionesGuardadas.some((pub: any) => pub.idPublicacion === this.postId)) {
            // Si no está, agregarla al array
            publicacionesGuardadas.push(publicacionData);

            // Actualizar el documento del usuario con el nuevo array de publicaciones
            await userRef.update({
              publicacionesGuardadas: publicacionesGuardadas,
            });

            console.log('Publicación guardada en el usuario:', this.uid);
            this.MensajeGuardada(); // Mostrar mensaje de éxito
          } else {
            console.log('La publicación ya está guardada');
          }
        } else {
          console.log('Documento del usuario no encontrado o está vacío');
        }
      } else {
        console.log('No se encontró la publicación con el idPublicacion:', this.postId);
      }
    } catch (error) {
      console.error('Error al guardar la publicación:', error);
      this.MensajeGuardadoError(); // Mostrar mensaje de error
    }
  } else {
    console.log('No se tiene el UID o el postId disponible');
  }
}

  
  





}