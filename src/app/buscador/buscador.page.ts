import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.page.html',
  styleUrls: ['./buscador.page.scss'],
})
export class BuscadorPage implements OnInit {
  recetas: any[] = []; // Array para almacenar las recetas
  busqueda: string = ''; // Variable para almacenar el término de búsqueda

  constructor(private router: Router, private apiService: ApiService) {}

  ngOnInit() {
    this.cargarRecetas(); // Cargar todas las recetas al iniciar la página
  }

  // Cargar todas las recetas al iniciar la página
  cargarRecetas() {
    this.apiService.obtenerRecetas().subscribe(
      (data) => {
        this.recetas = data.meals; // Almacena las recetas en la variable
      },
      (error) => {
        console.error('Error al obtener las recetas', error);
      }
    );
  }

  // Buscar recetas según el término ingresado
  buscarRecetas() {
    if (this.busqueda.trim()) {
      this.apiService.obtenerRecetasPorNombre(this.busqueda).subscribe(
        (data) => {
          this.recetas = data.meals ? data.meals : []; // Actualiza el array con los resultados de la búsqueda
        },
        (error) => {
          console.error('Error al buscar recetas', error);
        }
      );
    } else {
      this.cargarRecetas(); // Cargar todas las recetas si no hay término de búsqueda
    }
  }

  // Navegación a la página de publicación
// Navegación a la página de publicación y guardar la receta seleccionada
navigateTo(receta: any, path: string) {
  localStorage.setItem('recetaSeleccionada', JSON.stringify(receta)); // Guardar la receta en localStorage
  this.router.navigate([path]); // Navegar a la página de publicación
}

}
