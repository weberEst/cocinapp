import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, DocumentSnapshot } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import firebase from 'firebase/compat/app';
import { map } from 'rxjs/operators';

interface UserData {
  email: string;
  usuario: string;
  userid: string | null;
  publicacionesGuardadas: string[];
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseLoginService {

  constructor(
    private AngFireAuth: AngularFireAuth, 
    private router: Router, 
    private FireStore: AngularFirestore
  ) {}

  login(email: string, password: string) {
    return this.AngFireAuth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.AngFireAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  async crearUsuario(usuario: string, contrasenna: string, email: string, publicacionesGuardadas: string[] = []) {
    const userCredential = await this.AngFireAuth.createUserWithEmailAndPassword(email, contrasenna);
    const IdUsuario = userCredential.user?.uid;

    await this.FireStore.doc(`users/${IdUsuario}`).set({
      email: email,
      usuario: usuario,
      uid: IdUsuario,
      publicacionesGuardadas: publicacionesGuardadas
    });

    return userCredential;
  }

  // Método para obtener el estado de autenticación del usuario
  getCurrentUser(): Observable<any> {
    return this.AngFireAuth.authState;
  }

  // Método para obtener todos los datos del usuario desde Firestore
  async getUserData(uid: string): Promise<DocumentSnapshot<UserData>> {
    const docRef = this.FireStore.doc<UserData>(`users/${uid}`);
    const snapshot = await firstValueFrom(docRef.get());
    return snapshot as DocumentSnapshot<UserData>; 
  }


  async agregarPublicacionGuardada(uid: string, idPublicacion: string): Promise<void> {
    try {
      // Utilizando firebase.firestore.FieldValue.arrayUnion para agregar el idPublicacion al array
      await this.FireStore.collection('users').doc(uid).update({
        publicacionesGuardadas: firebase.firestore.FieldValue.arrayUnion(idPublicacion)
      });
  
      // Confirmación en consola
      console.log(idPublicacion);
      console.log('Publicación guardada exitosamente');
    } catch (error) {
      console.error('Error al guardar la publicación', error);
    }
  }
  

  getPublicacionesGuardadas(uid: string): Promise<string[]> {
    return this.FireStore.doc<{ publicacionesGuardadas: string[] }>(`users/${uid}`)
      .get()
      .toPromise()
      .then(doc => {
        if (doc?.exists) {
          // El documento existe, obtenemos los datos
          const userData = doc.data();
          return userData?.publicacionesGuardadas || [];
        } else {
          console.log(`El documento del usuario con UID ${uid} no existe.`);
          return [];
        }
      })
      .catch(error => {
        console.error('Error obteniendo publicaciones guardadas:', error);
        return [];
      });
  }

  // Método para probar la conexión a Firestore
  async probarConexion(): Promise<string> {
    try {
      await this.FireStore.collection('publicaciones').get().toPromise();
      return 'Conexión exitosa con Firebase';
    } catch (error) {
      console.error('Error en la conexión con Firebase:', error); // Agrega esta línea
      return 'Error en la conexión con Firebase: ' + error;
    }
  }

  obtenerRecetasDeBD(): Observable<any[]> {
    return this.FireStore.collection('publicaciones').valueChanges(); // Usa FireStore aquí
  }
}
