import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearpublicacionPage } from './crearpublicacion.page';

const routes: Routes = [
  {
    path: '',
    component: CrearpublicacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearpublicacionPageRoutingModule {}
