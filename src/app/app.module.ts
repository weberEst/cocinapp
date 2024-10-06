import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicStorageModule } from '@ionic/storage-angular';
import { provideHttpClient } from '@angular/common/http'; // Importar provideHttpClient

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    provideHttpClient() // Proveer HttpClient aquí
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
