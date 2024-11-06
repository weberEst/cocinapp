import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { FirebaseLoginService } from 'src/app/servicios/firebase-login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage{

  correo: string = "";
  contrasenna: string = "";

  constructor(public mensaje: ToastController, private route: Router, public alerta: AlertController, private storage : Storage, private loginfirebase:FirebaseLoginService) { }

  async Exito() {
    const toast = await this.mensaje.create({
      message: 'Inicio de sesión exitoso',
      duration: 2000
    });
    toast.present();
  }

  async Alerta() {
    const alert = await this.alerta.create({
      header: 'Error',
      message: 'Los campos no deben estar vacíos.',
      buttons: ['Aceptar']
    });
  
    await alert.present();
  }

  async Error() {
    const alert = await this.alerta.create({
      header: 'Error',
      message: 'Los datos ingresados son incorrectos',
      buttons: ['Aceptar']
    });
  
    await alert.present();
  }

  async ingresar() {
    if (this.correo === "" || this.contrasenna === "") {
      this.Alerta();
    }
    else {
      try{this.loginfirebase.login(this.correo,this.contrasenna)
        await this.storage.create();
        this.storage.set("SessionId", true)
        console.log("Inicio de sesión exitoso");
        this.Exito();
        this.route.navigate(["/inicio"])
      }catch(error){
        console.log("Error al iniciar sesión")
        this.Error();
      }

    }
  }

  navigateToRegister() {
    this.route.navigate(["/registro"]);
  }


}
