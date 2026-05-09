import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lab-list',
  standalone: true,
  imports: [CommonModule],

  template: `
    <div class="lab-grid">
      @for (lab of laboratorios; track lab.id) {
        <div class="lab-card">
          <div class="lab-info">
            <h3>{{ lab.nombre }}</h3>
            <p><strong>Capacidad:</strong> {{ lab.capacidad }} personas</p>
            
            <p>
              <strong>Estado:</strong> 
              <span class="status-badge" [ngClass]="lab.estado.toLowerCase()">
                {{ lab.estado }}
              </span>
            </p>
          </div>
          <div class="lab-actions">
            <button class="btn-cita" [disabled]="lab.estado !== 'OPERATIVO'" (click)="agregarCita.emit(lab.id)">
              {{ lab.estado === 'OPERATIVO' ? '+ Agregar Cita' : 'No Disponible' }}
            </button>
          </div>
        </div>
      } @empty {
        <p class="empty-msg">No hay laboratorios disponibles.</p>
      }
    </div>
  `, 
  styles: [`
    .lab-grid { display: grid; grid-template-columns: 1fr; gap: 15px; }
    .lab-card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); display: flex; flex-direction: column; gap: 15px; }
    .lab-info h3 { margin: 0 0 10px 0; color: #0056b3; }
    .lab-info p { margin: 5px 0; color: #555; }
    .status-badge { padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; text-transform: uppercase; }
    .operativo { background-color: #d4edda; color: #155724; }
    .mantenimiento { background-color: #fff3cd; color: #856404; }
    .inactivo { background-color: #f8d7da; color: #721c24; }
    .btn-cita { background-color: #28a745; color: white; width: 100%; padding: 10px; border: none; border-radius: 5px; cursor: pointer; font-weight: bold; }
    .btn-cita:disabled { background-color: #6c757d; cursor: not-allowed; }
    .empty-msg { text-align: center; color: #777; font-style: italic; }
    @media (min-width: 768px) { .lab-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (min-width: 1024px) { .lab-grid { grid-template-columns: repeat(3, 1fr); gap: 20px; } }
  `]
})
export class LabListComponent {
  @Input() laboratorios: any[] = []; 
  @Output() agregarCita = new EventEmitter<number>();
  @Input() isAdmin: boolean = false;
}