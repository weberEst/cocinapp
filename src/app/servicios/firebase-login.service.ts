import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirebaseLoginService {

  constructor(private AngFireAuth:AngularFireAuth, private router:Router ) { }

  

  login (email:string, password:string){
    return this.AngFireAuth.signInWithEmailAndPassword(email,password);
  }

  logout(){
    return this.AngFireAuth.signOut().then(()=>{
      this.router.navigate(['/login']);
    })
  }
}
