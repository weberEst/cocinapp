// src/app/perfil/perfil.page.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase/auth'; // Importar User de Firebase
import { Geolocation } from '@capacitor/geolocation';
import { FirebaseLoginService } from '../servicios/firebase-login.service'; 

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  nombre: string = ''; // Inicializa una variable para el nombre
  correo: string = ''; // Inicializa una variable para el correo
  constructor(private router: Router,
              private firebaseLoginService: FirebaseLoginService
  ) {}

  async ngOnInit() {

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
          this.correo = userData?.email || 'Email'; // Asigna el nombre del usuario
        } else {
          this.nombre = 'Usuario no encontrado'; // Mensaje en caso de que no se encuentre el documento
        }
      } else {
        this.nombre = 'No estás logueado'; // Mensaje en caso de que no haya usuario logueado
      }
    });
  }

}
