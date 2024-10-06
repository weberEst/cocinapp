import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='; // URL base de la API

  constructor(private http: HttpClient) {}

  // Obtener todas las recetas
  obtenerRecetas(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Buscar recetas por nombre
  obtenerRecetasPorNombre(nombre: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${nombre}`);
  }
}
