import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { LabListComponent } from './components/lab-list/lab-list';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-dashboard-index',
  standalone: true,
  imports: [CommonModule, RouterModule, LabListComponent],
  templateUrl: './index.html',
  styleUrls: ['./index.css']
})
export class DashboardIndexComponent implements OnInit {
  
  listaLaboratorios: any[] = [];
  
  // Nuevas variables para manejar la sesión
  isAdmin: boolean = false;
  nombreUsuario: string = 'Usuario';

  constructor(
    private http: HttpClient, 
    private router: Router,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit() {
    // 1. Recuperamos los datos del localStorage
    const role = localStorage.getItem('userRole');
    // Le damos acceso si es ADMIN o MAESTRO (según tu modelo Java)
    this.isAdmin = (role === 'ADMIN' || role === 'MAESTRO'); 
    
    // 2. Recuperamos el nombre (asegúrate de guardarlo en el login.ts)
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      this.nombreUsuario = storedName;
    }

    this.cargarLaboratorios();
  }

  cargarLaboratorios() {
    console.log('Consultando MS de Laboratorios en el puerto 8081...');
    const url = environment.apiUrlLaboratorios;
    
    this.http.get<any[]>(url).subscribe({
      next: (data) => {
        this.listaLaboratorios = data;
        console.log('Laboratorios cargados:', this.listaLaboratorios);
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Error al conectar con el MS de Laboratorios:', err);
        alert('No se pudo cargar la lista de laboratorios.');
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

  // Nueva función para borrar datos al salir
  cerrarSesion() {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }

  // Función exclusiva del Admin (debes tener una vista para crear labs)
  crearNuevoLaboratorio() {
    this.router.navigate(['/laboratorios/nuevo']);
  }
}