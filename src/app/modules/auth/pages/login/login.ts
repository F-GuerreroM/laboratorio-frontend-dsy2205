import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';   
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], 
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})

export class LoginComponent {
  
  credenciales = {
    email: '',
    password: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    console.log('Validaciones pasadas. Enviando al Microservicio:', this.credenciales);

    // ACTUALIZADO AL PUERTO 8082
    const urlMicroservicio = 'http://localhost:8082/api/usuarios/login'; 

    this.http.post(urlMicroservicio, this.credenciales).subscribe({
      next: (respuesta: any) => {
        console.log('¡Login exitoso!', respuesta);
        alert('Bienvenido al sistema');
       this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Error al iniciar sesión', error);
        alert('Credenciales incorrectas o servidor caído. Revisa la consola.');
      }
    });
  }
}