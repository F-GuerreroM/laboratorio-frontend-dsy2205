import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app'; // Asegúrate de que esta ruta apunte a tu app.ts
import { provideHttpClient } from '@angular/common/http'; // <-- 1. Importas esto
import { provideRouter } from '@angular/router'; // (Descomenta esto si usas rutas)
import { routes } from './app/app.routes';       // (Descomenta esto si usas rutas)

bootstrapApplication(App, {
  providers: [
    provideHttpClient(), // <-- 2. Lo agregas aquí para toda la app
    provideRouter(routes) // <-- 3. Lo agregas aquí para toda la app

    // Si estás usando rutas, mantén también esta línea:
    // provideRouter(routes) 
  ]
}).catch(err => console.error(err));