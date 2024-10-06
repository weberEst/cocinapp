import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  usuario: string = "";
  contrasenna: string = "";
  correo : string ="";

  constructor(
    private route: Router,
    private mensaje: ToastController,
  ) {}

  ngOnInit() {}

  async Alerta() {
    const alert = await this.mensaje.create({
      header: 'Error',
      message: 'Los campos no deben estar vacíos.',
      duration: 2000
    });
  
    await alert.present();
  }

  async ContrasenaInvalida() {
    const toast = await this.mensaje.create({
      message: 'La contraseña debe ser mayor a 8 dígitos.',
      duration: 2000
    });
    toast.present();
  }

  async Exito() {
    const toast = await this.mensaje.create({
      message: 'Registro exitoso.',
      duration: 2000
    });
    toast.present();
  }

  Registrar() {
    if (this.usuario === "" || this.contrasenna === "" || this.correo==="") {
      this.Alerta();
    } 
    else if (this.contrasenna.length <8){
      console.log("La contraseña debe ser mayor a 8 dígitos.");
      this.ContrasenaInvalida();
    }
    else {
      console.log("Inicio de sesión exitoso");
      this.Exito();
      this.route.navigate(["/inicio"]);
    }
  }
}
