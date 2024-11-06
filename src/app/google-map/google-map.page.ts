import { Component, ViewChild, ElementRef} from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

declare var google: any;

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.page.html',
  styleUrls: ['./google-map.page.scss'],
})
export class GoogleMapPage{

  map: any;
  @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef|undefined;

  Latitud: any;
  Longitud: any;
  constructor() {}

  async obtenerUbicacion(){
    const coordenadas = await Geolocation.getCurrentPosition();
    // Se muestra latitud y longitud a traves de  la consola 
    this.Latitud = coordenadas.coords.latitude;
    this.Longitud = coordenadas.coords.longitude;
  }

  async ngAfterViewInit() {
    await this.obtenerUbicacion();
    this.showMap();
  }

  showMap(){
    if (this.mapRef!==undefined){
      const location = new google.maps.LatLng(this.Latitud, this.Longitud)
      const options = {
        center: location, 
        zoom: 15,
        disableDefaultUI: true
      }
      this.map = new google.maps.Map(this.mapRef.nativeElement, options)

      new google.maps.Marker({
        position: location,
        map: this.map,
        title: "Mi Ubicación",
      });
    }
  }
}
