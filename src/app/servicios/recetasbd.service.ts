import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Receta } from '../models/receta.interface'; // Asegúrate de usar la ruta correcta
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RecetasBdService {

  constructor(private firestore: AngularFirestore) {}

  // Obtener todas las recetas de Firestore
  getRecetasBD(): Observable<Receta[]> {
    return this.firestore.collection<Receta>('publicaciones').valueChanges();
  }

  // Obtener una receta específica por ID
  getRecetaById(id: string): Observable<Receta | undefined> {
    return this.firestore.collection<Receta>('publicaciones').doc(id).valueChanges();
  }

  getPublicacionesPorIds(ids: string[]): Observable<Receta[]> {
    return this.firestore
      .collection<Receta>('publicaciones', (ref) => ref.where('idPublicacion', 'in', ids))
      .valueChanges(
        map((publicaciones: any[]) => publicaciones)
      );
  }
}