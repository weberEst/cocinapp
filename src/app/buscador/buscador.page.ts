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
  recetasAPI: any[] = [];
  recetasBD: any[] = [];
  busqueda: string = '';
  tipoRecetas: string = 'api'; // Variable para controlar el tipo de recetas a mostrar
  categoriaSeleccionada: string = ''; // Variable para la categoría seleccionada

  constructor(
    private router: Router,
    private apiService: ApiService,
    private firebaseLoginService: FirebaseLoginService,
    private recetasBdService: RecetasBdService // Asegúrate de que el nombre del servicio sea correcto
  ) {}

  ngOnInit() {
    this.cargarRecetasAPI(); // Cargar recetas genéricas al iniciar
  }

  // Cargar recetas genéricas (API) al iniciar o al presionar el botón
  cargarRecetasAPI() {
    this.apiService.obtenerRecetas().subscribe(
      (data) => {
        this.recetasAPI = data.meals || [];
        this.recetas = this.recetasAPI; // Mostrar recetas de la API
        this.tipoRecetas = 'api';
      },
      (error) => {
        console.error('Error al obtener las recetas de la API', error);
      }
    );
  }

  // Cargar recetas desde Firebase
  cargarRecetasBD() {
    this.recetasBdService.getRecetasBD().subscribe(
      (recetasBD) => {
        this.recetasBD = recetasBD || [];
        this.recetas = this.recetasBD; // Mostrar recetas de la BD
        this.tipoRecetas = 'bd';
      },
      (error) => {
        console.error('Error al obtener recetas de la BD', error);
      }
    );
  }

  // Filtrar recetas por categoría seleccionada
  filtrarPorCategoria() {
    const recetasOrigen = this.tipoRecetas === 'api' ? this.recetasAPI : this.recetasBD;

    if (this.categoriaSeleccionada.trim()) {
      this.recetas = recetasOrigen.filter((receta) =>
        (receta.strCategory || receta.categoria).toLowerCase() === this.categoriaSeleccionada.toLowerCase()
      );
    } else {
      this.recetas = recetasOrigen; // Restaurar la lista completa si no hay categoría seleccionada
    }
  }

  // Método para buscar recetas según el término ingresado y la categoría seleccionada
  buscarRecetas() {
    this.filtrarPorCategoria(); // Filtrar primero por categoría

    if (this.busqueda.trim()) {
      this.recetas = this.recetas.filter((receta) =>
        (receta.strMeal || receta.titulo).toLowerCase().includes(this.busqueda.toLowerCase())
      );
    }
  }

  // Navegación a la página de publicación y guardar la receta seleccionada
  navigateTo(receta: any, path: string) {
    localStorage.setItem('recetaSeleccionada', JSON.stringify(receta));
    this.router.navigate([path]);
  }
}
