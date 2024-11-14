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
  categoria: string="";

  constructor(
    public mensaje: ToastController,
    private route: Router,
    public alerta: AlertController,
    private firestore: AngularFirestore // Inyectar Firestore aquí
  ) { }

  async tomarFoto() {
    const imagen = await Camera.getPhoto({
      quality: 100,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    });
    console.log(imagen.webPath);
  }

  async mensajeExito() {
    const toast = await this.mensaje.create({
      message: 'Publicación creada con éxito',
      duration: 2000
    });
    toast.present();
  }

  async MensajeError() {
    const toast = await this.mensaje.create({
      message: 'No deben haber campos vacíos',
      duration: 2000
    });
    toast.present();
  }

  async Publicar() {
    if (this.titulo === "" && this.ingredientes === "" && this.pasos === "" && this.categoria === "") {
      console.log("No pueden estar los campos vacíos");
      this.MensajeError();
    } else {
      const publicacion = {
        titulo: this.titulo,
        ingredientes: this.ingredientes,
        pasos: this.pasos,
        fecha: new Date(), // Agregar la fecha de creación
        categoria: this.categoria,
      }

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

  ngOnInit() { }
}
