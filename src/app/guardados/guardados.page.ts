import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseLoginService } from '../servicios/firebase-login.service';
import { RecetasBdService } from '../servicios/recetasbd.service';
import { User } from 'firebase/auth'; // Importar User de Firebase
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Importar Firestore

@Component({
  selector: 'app-guardados',
  templateUrl: './guardados.page.html',
  styleUrls: ['./guardados.page.scss'],
})
export class GuardadosPage implements OnInit {

  publicacionesGuardadas: any[] = []; // Array para almacenar los id de las publicaciones guardadas
  publicacionesDetalles: any[] = []; // Array para almacenar los detalles de las publicaciones

  constructor(
    private router: Router,
    private firebaseLoginService: FirebaseLoginService,
    private recetasBdService: RecetasBdService,
    private firestore: AngularFirestore // Inyectar servicio de Firestore
  ) {}

  async ngOnInit() {
    // Obtener el usuario actual desde Firebase Authentication
    this.firebaseLoginService.getCurrentUser().subscribe(async (user: User | null) => {
      if (user) {
        const uid = user.uid;
  
        // Obtener los datos del usuario desde Firestore
        const usuarioDoc = await this.firebaseLoginService.getUserData(uid);
        if (usuarioDoc.exists) {
          const userData = usuarioDoc.data();
          
          // Obtener las publicaciones guardadas del usuario
          const publicaciones = userData?.publicacionesGuardadas || [];
          this.publicacionesGuardadas = publicaciones; // Asignar las publicaciones guardadas al array
  
          // Imprimir los ID de las publicaciones guardadas para verificar
          console.log("Publicaciones guardadas:", this.publicacionesGuardadas);
  
        
        } else {
          this.publicacionesGuardadas = [];
        }
      } else {
        this.publicacionesGuardadas = [];
      }
    });
  }

  // Método para navegar a la página de publicación cuando se hace clic en una receta
  navigateTo(recetaId: string, path: string) {
    this.router.navigate([path, recetaId]); // Navegar con el ID de la receta
  }
}
