import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Geolocation } from '@capacitor/geolocation';
import { FirebaseLoginService } from '../servicios/firebase-login.service'; 
import { User } from 'firebase/auth'; 

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {
  nombre: string = '';
  conexionEstado: string = ''; // Variable para almacenar el estado de conexión

  constructor(
    private router: Router, 
    private storage: Storage, 
    private firebaseLoginService: FirebaseLoginService
  ) {
    this.obtenerUbicacion();
  }

  // Función para navegar a diferentes rutas
  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  // Función para obtener la ubicación del usuario
  async obtenerUbicacion() {
    try {
      const coordenadas = await Geolocation.getCurrentPosition();
      console.log('Latitud ', coordenadas.coords.latitude);
      console.log('Longitud', coordenadas.coords.longitude);
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
    }
  }

  // Función que se ejecuta al inicializar la página
  async ngOnInit() {
    const storage = await this.storage.create();

    try {
      // Probar la conexión a Firebase
      this.conexionEstado = await this.firebaseLoginService.probarConexion();
      console.log(this.conexionEstado); // Mostrar el estado de conexión por consola

      // Obtener el usuario actual desde Firebase Authentication
      this.firebaseLoginService.getCurrentUser().subscribe(async (user: User | null) => { 
        if (user) {
          const uid = user.uid;
          const usuarioDoc = await this.firebaseLoginService.getUserData(uid);
          if (usuarioDoc.exists) {
            const userData = usuarioDoc.data();
            this.nombre = userData?.usuario || 'Usuario';
          } else {
            this.nombre = 'Usuario no encontrado';
          }
        } else {
          this.nombre = 'No estás logueado';
        }
      });
    } catch (error) {
      console.error('Error en ngOnInit:', error);
      this.conexionEstado = 'Error al conectar';
      this.nombre = 'Error al obtener el usuario';
    }
  }
}
