import { Component, OnInit , Input} from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {

  @Input() titulo: string = '';

  constructor(private route : Router, private storage : Storage) { }


  navigateTo(path: string) {
    this.route.navigate([path]);
  }
  ngOnInit() {}

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


