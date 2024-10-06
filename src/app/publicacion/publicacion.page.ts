import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'; // Para URLs seguras

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.page.html',
  styleUrls: ['./publicacion.page.scss'],
})
export class PublicacionPage implements OnInit {
  comentario: string = "";
  receta: any = {}; // Variable para almacenar la receta seleccionada

  constructor(
    public mensaje: ToastController,
    private route: Router,
    public alerta: AlertController,
    private sanitizer: DomSanitizer // Inyectamos el servicio para sanitizar URLs
  ) {}

  ngOnInit() {
    const recetaGuardada = localStorage.getItem('recetaSeleccionada');
    if (recetaGuardada) {
      this.receta = JSON.parse(recetaGuardada); // Recuperar la receta
    }
  }

  // Función para sanitizar el enlace de YouTube
  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url.replace('watch?v=', 'embed/'));
  }

  async mensajeLike() {
    const toast = await this.mensaje.create({
      message: 'Publicación añadida a favoritos',
      duration: 2000,
    });
    toast.present();
  }

  async MensajeGuardada() {
    const toast = await this.mensaje.create({
      message: 'Publicación guardada',
      duration: 2000,
    });
    toast.present();
  }

  async MensajeComentario() {
    const toast = await this.mensaje.create({
      message: 'Comentario Enviado',
      duration: 2000,
    });
    toast.present();
  }

  async MensajeComentarioError() {
    const toast = await this.mensaje.create({
      message: 'No se puede enviar un comentario vacío',
      duration: 2000,
    });
    toast.present();
  }

  Like() {
    this.mensajeLike();
  }

  Guardado() {
    this.MensajeGuardada();
  }

  Comentar() {
    if (this.comentario === "") {
      this.MensajeComentarioError();
    } else {
      this.MensajeComentario();
    }
  }
}
