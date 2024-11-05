import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

constructor(public mensaje:ToastController, private route:Router, public alerta:AlertController, private storage : Storage) {}

async ingresar(){

  await this.storage.create();
    // Obtener el correo del almacenamiento
  const SessionId = await this.storage.get("SessionId");
  
  if (SessionId) {
      // Si el correo está almacenado, el usuario ya está autenticado
      console.log("Usuario autenticado:", SessionId);
      // Redirigir directamente al inicio
      this.route.navigate(["/inicio"]);
  } else {
      // Si no hay correo almacenado, el usuario no está autenticado
      this.route.navigate(["/login"]);
  }
  
}

}

