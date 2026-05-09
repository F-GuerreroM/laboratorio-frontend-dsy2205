import '@angular/compiler';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LoginComponent } from './login';
import { of, throwError } from 'rxjs';
import { environment } from '../../../../../environments/environment';

describe('LoginComponent - Pruebas de Modulo', () => {
  let component: LoginComponent;
  let mockHttp: any;
  let mockRouter: any;

  beforeEach(() => {
    
    mockHttp = {
      post: vi.fn()
    };
    mockRouter = {
      navigate: vi.fn()
    };

   
    component = new LoginComponent(mockHttp, mockRouter);    
    
    globalThis.alert = vi.fn();
  });

  it('Test correcto instanciacion del componente de login', () => {
    expect(component).toBeTruthy();
  });

  it('Test correcto onLogin - flujo de autenticacion exitosa', () => {
    
    const mockRespuesta = { token: 'abc-123', usuario: 'felipe' };
    mockHttp.post.mockReturnValue(of(mockRespuesta));

    
    component.credenciales = { email: 'test@duoc.cl', password: '123' };
    
    component.onLogin();

    
    expect(mockHttp.post).toHaveBeenCalledWith(
      `${environment.apiUrlUsuarios}/login`, 
      component.credenciales
    );
    expect(globalThis.alert).toHaveBeenCalledWith('Bienvenido al sistema');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('Test correcto onLogin - manejo de error en credenciales o servidor', () => {
    
    mockHttp.post.mockReturnValue(throwError(() => new Error('Unauthorized')));
    const spyError = vi.spyOn(console, 'error').mockImplementation(() => {});

    component.onLogin();

    
    expect(globalThis.alert).toHaveBeenCalledWith(
      'Credenciales incorrectas o servidor caído. Revisa la consola.'
    );
    expect(spyError).toHaveBeenCalled();
  });
});