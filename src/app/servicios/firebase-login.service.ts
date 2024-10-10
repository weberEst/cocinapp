import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirebaseLoginService {

  constructor(private AngFireAuth:AngularFireAuth, private router:Router, private FireStore: AngularFirestore  ) { }

  

  login (email:string, password:string){
    return this.AngFireAuth.signInWithEmailAndPassword(email,password);
  }

  logout(){
    return this.AngFireAuth.signOut().then(()=>{
      this.router.navigate(['/login']);
    })
  }


  async crearUsuario(usuario: string, contrasenna: string, email: string){
    const userCredential = await this.AngFireAuth.createUserWithEmailAndPassword(email, contrasenna);
    const IdUsuario = userCredential.user?.uid;
  
    await this.FireStore.doc('users/$(uid)').set({

      email :email,
      usuario:usuario,
      uid:IdUsuario

    });

    return userCredential;
  }

    

}
