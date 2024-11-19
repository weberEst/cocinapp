import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'; // Para URLs seguras
import { FirebaseLoginService } from '../servicios/firebase-login.service'; 
import { User } from '@firebase/auth'; 
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';



@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.page.html',
  styleUrls: ['./publicacion.page.scss'],
})
export class PublicacionPage implements OnInit {
  comentario: string = "";
  receta: any = {}; // Variable para almacenar la receta seleccionada
  ingredientes: string[] =[];
  titulo: string= "";
  postId: string="";
  uid: string="";

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
    const recetaGuardada = localStorage.getItem('recetaSeleccionada');
    if (recetaGuardada) {
      this.receta = JSON.parse(recetaGuardada); // Recuperar la receta
      const recetaId = this.receta?.idPublicacion;
      console.log(recetaId)
      this.mostrarIngredientes();
    }

    this.firebaseLoginService.getCurrentUser().subscribe(async (user: User | null) => { 
      if (user) {
        // Usa el UID del usuario autenticado para buscar el nombre en Firestore
        this.uid = user.uid;}
      })
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



  mostrarIngredientes() {

    this.ingredientes = [];    
    let i= 1;

    while (this.receta[`strIngredient${i}`]) {
      const ingredient = this.receta[`strIngredient${i}`];
      this.ingredientes.push(ingredient || 'No se encontraron ingredientes');
      i++;    
    }
  }




}