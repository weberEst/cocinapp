import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BuscadorPageRoutingModule } from './buscador-routing.module';
import { BuscadorPage } from './buscador.page';
import { provideHttpClient } from '@angular/common/http'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuscadorPageRoutingModule
  ],
  providers: [provideHttpClient()], 
  declarations: [BuscadorPage]
})
export class BuscadorPageModule {}
