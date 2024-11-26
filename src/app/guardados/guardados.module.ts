import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuardadosPageRoutingModule } from './guardados-routing.module';

import { GuardadosPage } from './guardados.page';
import { CompartirModule } from '../modulos/compartir/compartir.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GuardadosPageRoutingModule,
    CompartirModule
  ],
  declarations: [GuardadosPage]
})
export class GuardadosPageModule {}
