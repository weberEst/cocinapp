// src/app/perfil/perfil.page.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  publicaciones = [
    { id: '1', titulo: 'Publicación 1' },
    { id: '2', titulo: 'Publicación 2' }
    // Agrega más publicaciones aquí
  ];

  constructor(private router: Router) {}

  ngOnInit() {}

  viewPublicacion(publicacionId: string) {
    this.router.navigate(['/publicacion', publicacionId]);
  }
}
