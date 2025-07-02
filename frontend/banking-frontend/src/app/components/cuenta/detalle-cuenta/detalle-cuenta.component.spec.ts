import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject, throwError } from 'rxjs';
import { DetalleCuentaComponent } from './detalle-cuenta.component';
import { CuentaService } from 'src/app/servicios/cuenta/cuenta.service';
import Swal from 'sweetalert2';

const mockCuenta = {
  id: '123',
  saldo: 1000,
  activa: true,
  nombre: 'Juan',
  apellido: 'Perez',
  numeroCuenta: 'acb123'
};

describe('DetalleCuentaComponent', () => {
  let component: DetalleCuentaComponent;
  let fixture: ComponentFixture<DetalleCuentaComponent>;
  let cuentaServiceSpy: jasmine.SpyObj<CuentaService>;
  let cuentaActualizadaSubject: Subject<string>;

  beforeEach(async () => {
    cuentaActualizadaSubject = new Subject<string>();

    cuentaServiceSpy = jasmine.createSpyObj('CuentaService', ['getCuentaPorId', 'onCuentaActualizada']);

    cuentaServiceSpy.onCuentaActualizada.and.returnValue(cuentaActualizadaSubject.asObservable());

    await TestBed.configureTestingModule({
      declarations: [DetalleCuentaComponent],
      providers: [
        { provide: CuentaService, useValue: cuentaServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleCuentaComponent);
    component = fixture.componentInstance;
  });

  it('debería cargar la cuenta al crear el componente usando el id recibido por input', () => {
    component.id = '123';

    cuentaServiceSpy.getCuentaPorId.and.returnValue(of(mockCuenta));

    component.ngOnInit();

    expect(cuentaServiceSpy.getCuentaPorId).toHaveBeenCalledWith('123');
    expect(component.cuenta).toEqual(mockCuenta);
  });

  it('debería mostrar mensaje de error cuando getCuentaPorId falla con 404', () => {
    component.id = '123';

    const swalSpy = spyOn(Swal, 'fire');

    const errorResponse = { status: 404 };

    cuentaServiceSpy.getCuentaPorId.and.returnValue(
      throwError(errorResponse)
    );

    component.ngOnInit();

    expect(cuentaServiceSpy.getCuentaPorId).toHaveBeenCalledWith('123');

    expect(swalSpy).toHaveBeenCalledWith('Error', 'No se encontraron resultados.', 'error');

    expect(component.cuenta).toBeUndefined();
  });

  it('debería mostrar mensaje "Error del servidor" al recibir error 500', () => {
    const swalSpy = spyOn(Swal, 'fire');
    const errorResponse = { status: 500 };

    cuentaServiceSpy.getCuentaPorId.and.returnValue(
      throwError(errorResponse)
    );

    component.id = '123';
    component.obtenerCuenta();

    expect(Swal.fire).toHaveBeenCalledWith('Error', 'Error del servidor. Intente más tarde.', 'error');
  });

  it('debería mostrar el mensaje personalizado si se recibe un error', () => {
    const mensajeServidor = 'Mensaje personalizado del servidor';
    spyOn(Swal, 'fire');

    const errorResponse = {
      error: { message: mensajeServidor }
    };

    cuentaServiceSpy.getCuentaPorId.and.returnValue(
      throwError(errorResponse)
    );

    component.id = '123';
    component.obtenerCuenta();

    expect(Swal.fire).toHaveBeenCalledWith('Error', mensajeServidor, 'error');
  });


});
