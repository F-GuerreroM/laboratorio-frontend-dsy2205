import '@angular/compiler';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AgregarCitaComponent } from './agregar-cita';
import { of, throwError } from 'rxjs';
import { environment } from '../../../../../environments/environment';

describe('AgregarCitaComponent - Pruebas de Modulo', () => {
  let component: AgregarCitaComponent;
  let mockRoute: any;
  let mockHttp: any;
  let mockRouter: any;

  beforeEach(() => {   
    mockRoute = {
      snapshot: {
        paramMap: {
          get: vi.fn().mockReturnValue('15') 
        }
      }
    };

    mockHttp = { post: vi.fn() };
    mockRouter = { navigate: vi.fn() };
   
    component = new AgregarCitaComponent(mockRoute, mockHttp, mockRouter);
    
    
    globalThis.alert = vi.fn();
  });

  it('Test correcto instanciacion del componente de citas', () => {
    expect(component).toBeTruthy();
  });

  it('Test correcto inicializacion ngOnInit - captura de ID laboratorio', () => {
    component.ngOnInit();
    
    expect(component.nuevaCita.idLaboratorio).toBe(15);
  });

  it('Test correcto onAgendar - flujo de creacion exitosa', () => {    
    mockHttp.post.mockReturnValue(of({ id: 100, status: 'CREATED' }));

    component.onAgendar();

    expect(mockHttp.post).toHaveBeenCalledWith(
      `${environment.apiUrlCitas}`,
      component.nuevaCita
    );
    expect(globalThis.alert).toHaveBeenCalledWith('¡Cita agendada con éxito!');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('Test correcto onAgendar - manejo de error en el servicio', () => {
   
    mockHttp.post.mockReturnValue(throwError(() => new Error('Service Unavailable')));
    const spyError = vi.spyOn(console, 'error').mockImplementation(() => {});

    component.onAgendar();

    expect(globalThis.alert).toHaveBeenCalledWith('Error al conectar con el servicio de citas.');
    expect(spyError).toHaveBeenCalled();
  });
});