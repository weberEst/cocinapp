// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [

  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./paginas/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'acerca-de',
    loadChildren: () => import('./acerca-de/acerca-de.module').then(m => m.AcercaDePageModule)
  },
  {
    path: 'configuracion',
    loadChildren: () => import('./configuracion/configuracion.module').then(m => m.ConfiguracionPageModule)
  },
  {
    path: 'buscador',
    loadChildren: () => import('./buscador/buscador.module').then(m => m.BuscadorPageModule)
  },
  {
    path: 'publicacion',
    loadChildren: () => import('./publicacion/publicacion.module').then(m => m.PublicacionPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilPageModule)
  },
  {
    path: 'crearpublicacion',
    loadChildren: () => import('./crearpublicacion/crearpublicacion.module').then(m => m.CrearpublicacionPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then(m => m.RegistroPageModule)
  }
  ,
  {
    path: 'privacidad',
    loadChildren: () => import('./privacidad/privacidad.module').then( m => m.PrivacidadPageModule)
  }
  ,
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  // Ruta para manejar páginas no encontradas (404)
  {
    path: '**',
    redirectTo: 'home'
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}