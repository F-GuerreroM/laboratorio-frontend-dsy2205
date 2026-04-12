import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './editar-perfil.html',
  styleUrls: ['./editar-perfil.css']
})
export class EditarPerfilComponent implements OnInit {
    
  usuarioId: number = 8; 

  // Modelo alineado exactamente con tu entidad Java
  perfil = {
    username: '',
    email: '',
    password: '',
    rol: 'USER'
  };

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.cargarDatosActuales();
  }

  cargarDatosActuales() {
    console.log('Cargando datos del usuario ID:', this.usuarioId);
    this.http.get(`http://localhost:8082/api/usuarios/${this.usuarioId}`).subscribe({
      next: (data: any) => {
        this.perfil = data;
      },
      error: (err) => console.error('Error al cargar perfil:', err)
    });
  }

  onActualizar() {
    console.log('Enviando actualización al MS Usuarios...');
    this.http.put(`http://localhost:8082/api/usuarios/${this.usuarioId}`, this.perfil).subscribe({
      next: (respuesta) => {
        alert('¡Perfil actualizado con éxito!');
        this.router.navigate(['/dashboard']); // Lo devolvemos al inicio
      },
      error: (err) => {
        console.error('Error al actualizar', err);
        alert('Hubo un problema al guardar los cambios.');
      }
    });
  }
}