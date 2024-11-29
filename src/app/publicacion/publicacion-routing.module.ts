import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicacionPage } from './publicacion.page';

const routes: Routes = [
  {
    path: ':id', // Ruta dinámica con parámetro ID
    component: PublicacionPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicacionPageRoutingModule {}
