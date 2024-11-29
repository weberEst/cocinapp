import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseLoginService } from '../servicios/firebase-login.service';
import { RecetasBdService } from '../servicios/recetasbd.service';
import { User } from 'firebase/auth'; // Importar User de Firebase

@Component({
  selector: 'app-guardados',
  templateUrl: './guardados.page.html',
  styleUrls: ['./guardados.page.scss'],
})
export class GuardadosPage implements OnInit {

  nombre: string = ''; // Variable para el nombre del usuario
  correo: string = ''; // Variable para el correo del usuario
  publicacionesGuardadas: any[] = []; // Array para almacenar las publicaciones guardadas

  constructor(
    private router: Router,
    private firebaseLoginService: FirebaseLoginService,
    private recetasBdService: RecetasBdService // Serviría para obtener más datos de recetas
  ) {}

  async ngOnInit() {
    // Obtener el usuario actual desde Firebase Authentication
    this.firebaseLoginService.getCurrentUser().subscribe(async (user: User | null) => { 
      if (user) {
        // Usa el UID del usuario autenticado para obtener más datos
        const uid = user.uid;

        // Obtener los datos del usuario desde Firestore
        const usuarioDoc = await this.firebaseLoginService.getUserData(uid);
        if (usuarioDoc.exists) {
          const userData = usuarioDoc.data();
          this.nombre = userData?.usuario || 'Usuario'; // Asignar el nombre del usuario
          this.correo = userData?.email || 'Email'; // Asignar el correo del usuario
          
          // Obtener las publicaciones guardadas del usuario
          const publicaciones = userData?.publicacionesGuardadas || []; // Array de publicaciones guardadas
          this.publicacionesGuardadas = publicaciones; // Asignar las publicaciones guardadas al array
        } else {
          this.nombre = 'Usuario no encontrado';
        }
      } else {
        this.nombre = 'No estás logueado';
      }
    });
  }

  // Método para navegar a la página de publicación cuando se hace clic en una receta
  navigateTo(recetaId: string, path: string) {
    this.router.navigate([path, recetaId]); // Navegar con el ID de la receta
  }
}
