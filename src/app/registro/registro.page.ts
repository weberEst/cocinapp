import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  ToastController } from '@ionic/angular';
import { FirebaseLoginService } from '../servicios/firebase-login.service';

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
    private acces: FirebaseLoginService,
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

  async CorreoExiste() {
    const alert = await this.mensaje.create({
      header: 'Error',
      message: 'El correo ingresado ya existe',
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

  async Registrar() {
    if (this.usuario === "" || this.contrasenna === "" || this.correo==="") {
      this.Alerta();
    } 
    else if (this.contrasenna.length <8){
      console.log("La contraseña debe ser mayor a 8 dígitos.");
      this.ContrasenaInvalida();
    }
    else {
      await this.acces.crearUsuario(this.usuario, this.contrasenna, this.correo).then(()=>{
        console.log("Inicio de sesión exitoso");
      this.Exito();
      this.route.navigate(["/inicio"]);
      }).catch(()=>{
      console.log("Error al iniciar sesión")
      this.CorreoExiste(); 
      })
    }
  }
}