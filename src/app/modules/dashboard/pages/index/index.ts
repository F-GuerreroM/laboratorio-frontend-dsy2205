import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { LabListComponent } from './components/lab-list/lab-list';
@Component({
  selector: 'app-dashboard-index',
  standalone: true,
  imports: [CommonModule, RouterModule, LabListComponent],
  templateUrl: './index.html',
  styleUrls: ['./index.css']
})
export class DashboardIndexComponent implements OnInit {
  
  listaLaboratorios: any[] = [];

 constructor(
    private http: HttpClient, 
    private router: Router,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit() {
    this.cargarLaboratorios();
  }

 cargarLaboratorios() {
    console.log('Consultando MS de Laboratorios en el puerto 8081...');
    
    const url = 'http://localhost:8081/api/laboratorios';
    
    this.http.get<any[]>(url).subscribe({
      next: (data) => {
        this.listaLaboratorios = data;
        console.log('Laboratorios cargados:', this.listaLaboratorios);
               
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Error al conectar con el MS de Laboratorios:', err);
        alert('No se pudo cargar la lista de laboratorios. ¿Está corriendo el puerto 8081?');
      }
    });
  }
  
  abrirModalCita(idLaboratorio: number) {
    console.log('Redirigiendo a formulario de citas para Lab:', idLaboratorio);    
    this.router.navigate(['/citas/agregar', idLaboratorio]);
  }

  editarPerfil() {
    console.log('Redirigiendo a Editar Perfil (MS Usuarios)');
    this.router.navigate(['/perfil/editar']);
  }
}