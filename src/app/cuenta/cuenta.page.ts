import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements OnInit {

  constructor(private storage: Storage, private route: Router) { }

  ngOnInit() {
  }

  cerrarSesion() {
    // Eliminar la sesión del almacenamiento (Ionic Storage)
    this.storage.remove("SessionId").then(() => {
        console.log("Sesión cerrada correctamente.");
        
        // Redirigir al usuario a la página de login
        this.route.navigate(["/home"]);
    }).catch((error) => {
        console.error("Error al cerrar sesión", error);
        // Si ocurre algún error, muestra una alerta o maneja el error
    });
}
}
