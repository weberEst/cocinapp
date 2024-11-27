import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { AngularFirestore } from '@angular/fire/compat/firestore';

defineCustomElements(window);

@Component({
  selector: 'app-crearpublicacion',
  templateUrl: './crearpublicacion.page.html',
  styleUrls: ['./crearpublicacion.page.scss'],
})
export class CrearpublicacionPage implements OnInit {

  titulo: string = "";
  ingredientes: string = "";
  pasos: string = "";
  categoria: string = "";
  idPublicacion: string = "";
  imagenBase64: string = ""; // Para almacenar la imagen en Base64

  constructor(
    public mensaje: ToastController,
    private route: Router,
    public alerta: AlertController,
    private firestore: AngularFirestore // Firestore para la base de datos
  ) { }

  // Método para tomar una foto y convertirla a Base64
  async tomarFoto() {
    const imagen = await Camera.getPhoto({
      quality: 100,
      allowEditing: true,
      resultType: CameraResultType.Base64, // Cambiar a Base64
      source: CameraSource.Camera,
    });

    this.imagenBase64 = `data:image/jpeg;base64,${imagen.base64String}`; // Guardar la imagen como cadena Base64
    console.log("Imagen tomada:", this.imagenBase64);
  }

  // Mostrar mensaje de éxito
  async mensajeExito() {
    const toast = await this.mensaje.create({
      message: 'Publicación creada con éxito',
      duration: 2000
    });
    toast.present();
  }

  // Mostrar mensaje de error
  async MensajeError() {
    const toast = await this.mensaje.create({
      message: 'No deben haber campos vacíos',
      duration: 2000
    });
    toast.present();
  }

  // Método para publicar
  async Publicar() {
    if (this.titulo === "" || this.ingredientes === "" || this.pasos === "" || this.categoria === "" || this.imagenBase64 === "") {
      console.log("No pueden estar los campos vacíos");
      this.MensajeError();
    } else {
      const nuevoID = this.generarIdUnico();
      const publicacion = {
        titulo: this.titulo,
        ingredientes: this.ingredientes,
        pasos: this.pasos,
        fecha: new Date(), // Agregar fecha de creación
        categoria: this.categoria,
        idPublicacion: nuevoID,
        imagen: this.imagenBase64, // Agregar imagen como Base64
      };

      try {
        await this.firestore.collection('publicaciones').add(publicacion);
        console.log("Publicación creada con éxito");
        this.mensajeExito();
        this.route.navigate(["/inicio"]);
      } catch (error) {
        console.error("Error al crear la publicación: ", error);
      }
    }
  }

  // Método para generar un ID único
  generarIdUnico(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `${timestamp}-${random}`;
  }

  ngOnInit() { }
}
