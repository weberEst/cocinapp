import { Component, OnInit } from '@angular/core';
import { FirebaseLoginService } from '../servicios/firebase-login.service';
import { RecetasBdService } from '../servicios/recetasbd.service';

@Component({
  selector: 'app-guardados',
  templateUrl: './guardados.page.html',
  styleUrls: ['./guardados.page.scss'],
})
export class GuardadosPage implements OnInit {

  uid: string =''; // UID del usuario autenticado
  publicacionesGuardadas: any[] = [];
  recetasBD: any[] = [];


  constructor(
    private firebaseLoginService: FirebaseLoginService,
    private recetasBdService: RecetasBdService
  ) { }

  async ngOnInit() {
    try {
      // Obtener los IDs de las publicaciones guardadas por el usuario
      const idsGuardados = await this.firebaseLoginService.getPublicacionesGuardadas(this.uid);
      
      if (idsGuardados.length > 0) {
        // Obtener todas las recetas de la BD
        this.recetasBdService.getRecetasBD().subscribe(
          (recetas) => {
            // Filtrar las recetas que están en el array de publicaciones guardadas
            this.recetasBD = recetas.filter(receta => idsGuardados.includes(receta.id as string));
            this.publicacionesGuardadas = this.recetasBD;  // Asignar las recetas filtradas
          },
          (error) => {
            console.error('Error al obtener recetas de la BD', error);
          }
        );
      } else {
        console.log('No hay recetas guardadas.');
      }
    } catch (error) {
      console.error('Error obteniendo publicaciones guardadas:', error);
    }
  }

}
