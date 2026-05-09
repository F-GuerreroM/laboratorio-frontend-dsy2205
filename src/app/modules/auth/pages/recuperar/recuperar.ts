import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-recuperar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './recuperar.html',
  styleUrls: ['../login/login.css'] 
})
export class RecuperarComponent {
  
  // Aquí solo necesitamos el correo, no la contraseña
  email: string = '';

  constructor(private http: HttpClient) {}

  onRecuperar() {
    console.log('Solicitando recuperación para:', this.email);
    
    const urlMicroservicio = `${environment.apiUrlUsuarios}/recuperar`; 
    
    this.http.post(urlMicroservicio, { email: this.email }).subscribe({
      next: (respuesta) => {
        alert('Si el correo existe en nuestra base de datos, te enviaremos una nueva contraseña.');
      },
      error: (error) => {
        console.error('Error al solicitar recuperación', error);
        alert('Hubo un problema de conexión con el servidor.');
      }
    });
  }
}