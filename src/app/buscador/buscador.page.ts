import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { FirebaseLoginService } from '../servicios/firebase-login.service';
import { RecetasBdService } from '../servicios/recetasbd.service'; // Asegúrate de que el nombre y la ruta sean correctos

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.page.html',
  styleUrls: ['./buscador.page.scss'],
})
export class BuscadorPage implements OnInit {
  recetas: any[] = [];
  busqueda: string = '';

  constructor(
    private router: Router,
    private apiService: ApiService,
    private firebaseLoginService: FirebaseLoginService,
    private recetasBdService: RecetasBdService // Asegúrate de que el nombre del servicio sea correcto
  ) {}

  ngOnInit() {
    this.cargarRecetas();
  }

  // Cargar todas las recetas al iniciar la página
  cargarRecetas() {
    this.apiService.obtenerRecetas().subscribe(
      (data) => {
        this.recetas = data.meals || [];
      },
      (error) => {
        console.error('Error al obtener las recetas', error);
      }
    );
  }

  // Cargar recetas desde Firebase
  cargarRecetasBD() {
    this.recetasBdService.getRecetasBD().subscribe( // Utiliza el método correcto de tu servicio
      (recetasBD) => {
        this.recetas = recetasBD || [];
      },
      (error) => {
        console.error('Error al obtener recetas de la BD', error);
      }
    );
  }

  // Buscar recetas según el término ingresado
  buscarRecetas() {
    if (this.busqueda.trim()) {
      this.apiService.obtenerRecetasPorNombre(this.busqueda).subscribe(
        (data) => {
          this.recetas = data.meals || [];
        },
        (error) => {
          console.error('Error al buscar recetas', error);
        }
      );
    } else {
      this.cargarRecetas(); // Cargar todas las recetas si no hay término de búsqueda
    }
  }

  // Navegación a la página de publicación y guardar la receta seleccionada
  navigateTo(receta: any, path: string) {
    localStorage.setItem('recetaSeleccionada', JSON.stringify(receta));
    this.router.navigate([path]);
  }
}
