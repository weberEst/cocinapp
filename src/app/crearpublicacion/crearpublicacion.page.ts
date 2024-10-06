import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crearpublicacion',
  templateUrl: './crearpublicacion.page.html',
  styleUrls: ['./crearpublicacion.page.scss'],

})
export class CrearpublicacionPage implements OnInit {

  titulo:string =""
  ingredientes :string =""
  pasos :string =""

  constructor(public mensaje:ToastController, private route:Router,public alerta:AlertController) { }

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

  

  Publicar(){
    if(this.titulo ==="" && this.ingredientes==="" && this.pasos===""){
      console.log("No pueden estar los campos vacios ")
      this.MensajeError()
    }
    else{
      console.log("Publicación creada con éxito")
      this.mensajeExito()
      this.route.navigate(["/inicio"])
    }
  }
  ngOnInit() {
  }
}
