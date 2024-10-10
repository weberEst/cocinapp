import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CrearpublicacionPage } from './crearpublicacion.page';
import { CrearpublicacionPageRoutingModule } from './crearpublicacion-routing.module';
import { CompartirModule } from '../modulos/compartir/compartir.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearpublicacionPageRoutingModule,
    CompartirModule
  ],
  declarations: [CrearpublicacionPage]
})
export class CrearpublicacionPageModule {}
