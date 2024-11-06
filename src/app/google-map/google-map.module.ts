import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GoogleMapPageRoutingModule } from './google-map-routing.module';

import { GoogleMapPage } from './google-map.page';
import { CompartirModule } from '../modulos/compartir/compartir.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GoogleMapPageRoutingModule,
    CompartirModule
  ],
  declarations: [GoogleMapPage]
})
export class GoogleMapPageModule {}
