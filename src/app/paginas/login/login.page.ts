import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario: string = "";
  contrasenna: string = "";

  constructor(public mensaje: ToastController, private route: Router, public alerta: AlertController, private storage : Storage) { }

  async Exito() {
    const toast = await this.mensaje.create({
      message: 'Inicio de sesión exitoso',
      duration: 2000
    });
    toast.present();
  }

  async Error() {
    const toast = await this.mensaje.create({
      message: 'La contraseña debe tener mínimo 8 caractéres',
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

  ingresar() {
    if (this.usuario === "" || this.contrasenna === "") {
      this.Alerta();
    }
    else if(this.contrasenna.length<8){
      this.Error();
    }
    else {
      this.storage.set("usuario", this.usuario)
      this.storage.set("SessionId", true)
      console.log("Inicio de sesión exitoso");
      this.Exito();
      this.route.navigate(["/inicio"]);
    }
  }

  navigateToRegister() {
    this.route.navigate(["/registro"]);
  }

  async ngOnInit() {
    const storage = await this.storage.create();
  }

}
