import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Geolocation } from '@capacitor/geolocation';
import { FirebaseLoginService } from '../servicios/firebase-login.service'; 
import { User } from 'firebase/auth'; // Importar User de Firebase

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {
  nombre: string = ''; // Inicializa una variable para el nombre

  constructor(
    private router: Router, 
    private storage: Storage, 
    private firebaseLoginService: FirebaseLoginService
  ) {
    this.obtenerUbicacion(); // Llamada a la función de geolocalización
  }

  // Función para navegar a diferentes rutas
  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  // Función para obtener la ubicación del usuario
  async obtenerUbicacion() {
    const coordenadas = await Geolocation.getCurrentPosition();
    console.log('Latitud ', coordenadas.coords.latitude);
    console.log('Longitud', coordenadas.coords.longitude);
  }

  // Función que se ejecuta al inicializar la página
  async ngOnInit() {
    const storage = await this.storage.create();

    // Obtener el usuario actual desde Firebase Authentication
    this.firebaseLoginService.getCurrentUser().subscribe(async (user: User | null) => { 
      if (user) {
        // Usa el UID del usuario autenticado para buscar el nombre en Firestore
        const uid = user.uid;

        // Obtener el documento del usuario desde Firestore
        const usuarioDoc = await this.firebaseLoginService.getUserData(uid);
        if (usuarioDoc.exists) { // Cambiado a .exists para la compatibilidad
          const userData = usuarioDoc.data(); // Obtén los datos del usuario
          this.nombre = userData?.usuario || 'Usuario'; // Asigna el nombre del usuario
        } else {
          this.nombre = 'Usuario no encontrado'; // Mensaje en caso de que no se encuentre el documento
        }
      } else {
        this.nombre = 'No estás logueado'; // Mensaje en caso de que no haya usuario logueado
      }
    });
  }
}
