// src/app/inicio/inicio.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { InicioPageRoutingModule } from './inicio-routing.module';
import { InicioPage } from './inicio.page';
import { CompartirModule } from '../modulos/compartir/compartir.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioPageRoutingModule,
    CompartirModule
  ],
  declarations: [InicioPage]
})
export class InicioPageModule {}
  