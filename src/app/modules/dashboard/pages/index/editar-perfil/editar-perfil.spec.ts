import '@angular/compiler';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { EditarPerfilComponent } from './editar-perfil';
import { of, throwError } from 'rxjs';
import { environment } from '../../../../../../environments/environment';

describe('EditarPerfilComponent - Pruebas de Modulo', () => {
  let component: EditarPerfilComponent;
  let mockHttp: any;
  let mockRouter: any;

  beforeEach(() => {
    
    mockHttp = {
      get: vi.fn(),
      put: vi.fn()
    };
    mockRouter = {
      navigate: vi.fn()
    };
  
    component = new EditarPerfilComponent(mockHttp, mockRouter);
    
       globalThis.alert = vi.fn();
  });

  it('Test correcto instanciacion del componente de edicion', () => {
    expect(component).toBeTruthy();
  });

  it('Test correcto cargarDatosActuales - flujo exitoso', () => {
    const mockUsuario = { username: 'felipe', email: 'felipe@test.com', rol: 'USER' };
    mockHttp.get.mockReturnValue(of(mockUsuario));

    component.cargarDatosActuales();

    expect(mockHttp.get).toHaveBeenCalledWith(`${environment.apiUrlUsuarios}/api/usuarios/8`);
    expect(component.perfil).toEqual(mockUsuario);
  });

  it('Test correcto cargarDatosActuales - manejo de error', () => {
    mockHttp.get.mockReturnValue(throwError(() => new Error('Error al cargar')));
    const spyError = vi.spyOn(console, 'error').mockImplementation(() => {});

    component.cargarDatosActuales();

    expect(spyError).toHaveBeenCalled();
  });

  it('Test correcto onActualizar - actualizacion exitosa', () => {
    mockHttp.put.mockReturnValue(of({ status: 200 }));

    component.onActualizar();

    expect(mockHttp.put).toHaveBeenCalledWith(
      `${environment.apiUrlUsuarios}/8`, 
      component.perfil
    );
    expect(globalThis.alert).toHaveBeenCalledWith('¡Perfil actualizado con éxito!');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('Test correcto onActualizar - manejo de error en servidor', () => {
    mockHttp.put.mockReturnValue(throwError(() => new Error('Error al actualizar')));
    const spyError = vi.spyOn(console, 'error').mockImplementation(() => {});

    component.onActualizar();

    expect(globalThis.alert).toHaveBeenCalledWith('Hubo un problema al guardar los cambios.');
    expect(spyError).toHaveBeenCalled();
  });
});