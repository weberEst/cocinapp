export interface Receta {
    id?: string;               // ID de la receta en Firestore, opcional
    fecha: string;            // Marca de tiempo
    ingredientes: string;      // Ingredientes como una cadena
    pasos: string;            // Pasos como una cadena
    titulo: string;           // Título de la receta
  }
  