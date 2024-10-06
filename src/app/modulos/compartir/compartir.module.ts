import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/header/header.component';
import { MenuComponent } from 'src/app/menu/menu.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [HeaderComponent, MenuComponent],
  exports: [HeaderComponent, MenuComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class CompartirModule { }
