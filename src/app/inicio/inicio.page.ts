import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Geolocation } from '@capacitor/geolocation';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {
  constructor(private router: Router, private storage : Storage) {
    this.obtenerUbicacion();
  }
  usuario : String =""

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  async obtenerUbicacion(){
    const coordenadas = await Geolocation.getCurrentPosition();
    // Se muestra latitud y longitud a traves de  la consola 
    console.log('Latitud ', coordenadas.coords.latitude);
    console.log('Longitud', coordenadas.coords.longitude);

  }

  async ngOnInit(){
    const storage = await this.storage.create()
    this.usuario = await this.storage.get("usuario");
  }
}
