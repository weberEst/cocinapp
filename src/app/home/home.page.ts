import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

constructor(public mensaje:ToastController, private route:Router, public alerta:AlertController) {}

ingresar(){
    this.route.navigate(["/login"])
  
}



}

