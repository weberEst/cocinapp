import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrivacidadPageRoutingModule } from './privacidad-routing.module';

import { PrivacidadPage } from './privacidad.page';
import { CompartirModule } from '../modulos/compartir/compartir.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrivacidadPageRoutingModule,
    CompartirModule
  ],
  declarations: [PrivacidadPage]
})
export class PrivacidadPageModule {}
