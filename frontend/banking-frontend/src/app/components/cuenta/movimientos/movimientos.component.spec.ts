import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MovimientosComponent } from './movimientos.component';
import { MovimientoService } from 'src/app/servicios/movimiento/movimiento.service';
import { of, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

describe('MovimientosComponent', () => {
  let component: MovimientosComponent;
  let fixture: ComponentFixture<MovimientosComponent>;
  let movimientoServiceSpy: jasmine.SpyObj<MovimientoService>;
  let swalSpy: jasmine.Spy;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MovimientoService', ['getMovimientoPorId']);

    TestBed.configureTestingModule({
      declarations: [MovimientosComponent],
      providers: [
        { provide: MovimientoService, useValue: spy },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ idCuenta: 'id1' }),
            snapshot: {
              paramMap: {
                get: (key: string) => 'id1'
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MovimientosComponent);
    component = fixture.componentInstance;
    movimientoServiceSpy = TestBed.inject(MovimientoService) as jasmine.SpyObj<MovimientoService>;

    swalSpy = spyOn(Swal, 'fire');
  });

  it('debería asignar movimientos al inicializar', () => {
    const mockMovimientos = [
      { cuentaOrigenId: 'id1', cuentaDestinoId: 'id2', monto: 100, fecha: '2025-07-02' }
    ];

    component.idCuenta = 'id1';
    movimientoServiceSpy.getMovimientoPorId.and.returnValue(of(mockMovimientos));

    component.ngOnInit();

    expect(movimientoServiceSpy.getMovimientoPorId).toHaveBeenCalledWith('id1');
    expect(component.movimientos).toEqual(mockMovimientos);
  });

  it('debería mostrar error con Swal si la llamada falla con status 500', () => {
    component.idCuenta = 'id1';

    const errorResponse = { status: 500 };
    movimientoServiceSpy.getMovimientoPorId.and.returnValue(throwError(errorResponse));

    component.ngOnInit();

    expect(swalSpy).toHaveBeenCalledWith('Error', 'Error del servidor. Intente más tarde.', 'error');
  });


  it('obtenerTipo retorna "Enviado" si cuentaOrigenId es igual a idCuenta', () => {
    component.idCuenta = 'id1';
    const mov = { cuentaOrigenId: 'id1', cuentaDestinoId: 'id2', monto: 50, fecha: '2025-07-02' };

    expect(component.obtenerTipo(mov)).toBe('Enviado');
  });

  it('obtenerTipo retorna "Recibido" si cuentaOrigenId es distinto a idCuenta', () => {
    component.idCuenta = 'id1';
    const mov = { cuentaOrigenId: 'id3', cuentaDestinoId: 'id2', monto: 50, fecha: '2025-07-02' };

    expect(component.obtenerTipo(mov)).toBe('Recibido');
  });

  it('obtenerContraparte retorna cuentaDestinoId si cuentaOrigenId es igual a idCuenta', () => {
    component.idCuenta = 'id1';
    const mov = { cuentaOrigenId: 'id1', cuentaDestinoId: 'id2', monto: 50, fecha: '2025-07-02' };

    expect(component.obtenerContraparte(mov)).toBe('id2');
  });

  it('obtenerContraparte retorna cuentaOrigenId si cuentaOrigenId es distinto a idCuenta', () => {
    component.idCuenta = 'id1';
    const mov = { cuentaOrigenId: 'id3', cuentaDestinoId: 'id2', monto: 50, fecha: '2025-07-02' };

    expect(component.obtenerContraparte(mov)).toBe('id3');
  });

  it('debería mostrar mensaje personalizado si hay un error', () => {
    const errorPersonalizado = {
      status: 400,
      error: { message: 'Mensaje personalizado del servidor' }
    };
    movimientoServiceSpy.getMovimientoPorId.and.returnValue(throwError(errorPersonalizado));

    component.ngOnInit();

    expect(swalSpy).toHaveBeenCalledWith('Error', 'Mensaje personalizado del servidor', 'error');
  });

 

});
