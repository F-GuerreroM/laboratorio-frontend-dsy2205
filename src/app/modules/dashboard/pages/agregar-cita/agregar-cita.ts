import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-agregar-cita',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './agregar-cita.html',
  styleUrls: ['./agregar-cita.css']
})
export class AgregarCitaComponent implements OnInit {
   
  nuevaCita = {
    idUsuario: 1,        
    idLaboratorio: 0,     
    fechaHora: '',        
    observaciones: ''    
  };

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {    
    const id = this.route.snapshot.paramMap.get('idLab');
    this.nuevaCita.idLaboratorio = Number(id);
  }

  onAgendar() {
    console.log('Enviando cita al MS Citas (8083):', this.nuevaCita);
    
    const url = 'http://localhost:8083/api/citas';

    this.http.post(url, this.nuevaCita).subscribe({
      next: (res) => {
        alert('¡Cita agendada con éxito!');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Error al agendar:', err);
        alert('Error al conectar con el servicio de citas.');
      }
    });
  }
}