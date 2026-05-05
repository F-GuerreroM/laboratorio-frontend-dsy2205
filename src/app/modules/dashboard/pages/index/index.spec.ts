import '@angular/compiler';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { DashboardIndexComponent } from './index';
import { of, throwError } from 'rxjs'; 

describe('DashboardIndexComponent - Pruebas de Modulo', () => {
  let component: DashboardIndexComponent;
  let mockHttp: any;
  let mockRouter: any;
  let mockCdr: any;

  beforeEach(() => {
    mockHttp = { get: vi.fn() };
    mockRouter = { navigate: vi.fn() };
    mockCdr = { detectChanges: vi.fn() };

    component = new DashboardIndexComponent(mockHttp, mockRouter, mockCdr);
  });

  it('Test correcto instanciacion del componente', () => {
    expect(component).toBeTruthy();
  });

  it('Test correcto ciclo de vida ngOnInit y carga de laboratorios exitosa', () => {
    const mockData = [{ id: 1, nombre: 'Lab A' }];
    mockHttp.get.mockReturnValue(of(mockData));

    component.ngOnInit();

    expect(mockHttp.get).toHaveBeenCalledWith('http://localhost:8081/api/laboratorios');
    expect(component.listaLaboratorios).toEqual(mockData);
    expect(mockCdr.detectChanges).toHaveBeenCalled();
  });

  it('Test correcto manejo de error en cargarLaboratorios', () => {
    mockHttp.get.mockReturnValue(throwError(() => new Error('Error de red simulado')));
    
    
    globalThis.alert = vi.fn();
    vi.spyOn(console, 'error').mockImplementation(() => {});

    component.cargarLaboratorios();

    expect(globalThis.alert).toHaveBeenCalled();
  });
  it('Test correcto redireccionamiento metodo abrirModalCita', () => {
    const idLabPrueba = 10;
    component.abrirModalCita(idLabPrueba);

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/citas/agregar', idLabPrueba]);
  });

  it('Test correcto redireccionamiento metodo editarPerfil', () => {
    component.editarPerfil();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/perfil/editar']);
  });
});