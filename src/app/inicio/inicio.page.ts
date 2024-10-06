import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {
  constructor(private router: Router, private storage : Storage) {}
  usuario : String =""

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  async ngOnInit(){
    const storage = await this.storage.create()
    this.usuario = await this.storage.get("usuario");
  }
}
