import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroPage } from './registro.page'; // Usa el nombre correcto aquí

const routes: Routes = [
  {
    path: '',
    component: RegistroPage // Usa el nombre correcto aquí
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistroPageRoutingModule {}
