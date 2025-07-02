import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TransferenciaComponent } from './transferencia.component';
import { CuentaService } from 'src/app/servicios/cuenta/cuenta.service';
import { MovimientoService } from 'src/app/servicios/movimiento/movimiento.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { CuentaBancaria } from 'src/app/interfaces/cuentaBancaria.model';

describe('TransferenciaComponent', () => {
  let component: TransferenciaComponent;
  let fixture: ComponentFixture<TransferenciaComponent>;
  let cuentaServiceSpy: jasmine.SpyObj<CuentaService>;
  let movimientoServiceSpy: jasmine.SpyObj<MovimientoService>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<TransferenciaComponent>>;
  let swalSpy: jasmine.Spy;

  beforeEach(async () => {
    cuentaServiceSpy = jasmine.createSpyObj('CuentaService', ['getCuentas', 'emitirCuentaActualizada']);
    movimientoServiceSpy = jasmine.createSpyObj('MovimientoService', ['crearTransferencia']);
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    swalSpy = spyOn(Swal, 'fire');

    await TestBed.configureTestingModule({
      declarations: [TransferenciaComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: CuentaService, useValue: cuentaServiceSpy },
        { provide: MovimientoService, useValue: movimientoServiceSpy },
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: { cuentaOrigenId: 'origen1' } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TransferenciaComponent);
    component = fixture.componentInstance;
  });

  it('debería mostrar error con Swal si getCuentas falla', () => {
    const error = { status: 500 };
    cuentaServiceSpy.getCuentas.and.returnValue(throwError(error));

    component.ngOnInit();

    expect(swalSpy).toHaveBeenCalledWith('Error', 'Error del servidor. Intente más tarde.', 'error');
  });

  it('no debería enviar transferencia si el formulario es inválido', () => {
    component.form.setValue({ cuentaDestinoId: '', monto: '' });
    component.enviarTransferencia();

    expect(movimientoServiceSpy.crearTransferencia).not.toHaveBeenCalled();
    expect(component.form.touched).toBeTrue();
  });

  it('debería llamar a crearTransferencia y cerrar modal en éxito', fakeAsync(() => {
    component.form.setValue({ cuentaDestinoId: 'destino1', monto: 100 });

    movimientoServiceSpy.crearTransferencia.and.returnValue(of({
      cuentaOrigenId: 'origen1',
      cuentaDestinoId: 'destino1',
      monto: 100,
      fecha: '2025-07-02T00:00:00Z'
    }));

    component.enviarTransferencia();
    tick();

    expect(movimientoServiceSpy.crearTransferencia).toHaveBeenCalledWith({
      cuentaOrigenId: 'origen1',
      cuentaDestinoId: 'destino1',
      monto: 100
    });
    expect(cuentaServiceSpy.emitirCuentaActualizada).toHaveBeenCalledWith('origen1');
    expect(dialogRefSpy.close).toHaveBeenCalled();
    expect(swalSpy).toHaveBeenCalledWith('Éxito', 'Transferencia realizada con éxito.', 'success');
  }));

  it('debería mostrar error con Swal si crearTransferencia falla con status 400', fakeAsync(() => {
    component.form.setValue({ cuentaDestinoId: 'destino1', monto: 100 });
    const error = { status: 400 };
    movimientoServiceSpy.crearTransferencia.and.returnValue(throwError(error));

    component.enviarTransferencia();
    tick();

    expect(swalSpy).toHaveBeenCalledWith('Error', 'Datos inválidos.', 'error');
    expect(dialogRefSpy.close).not.toHaveBeenCalled();
  }));


  it('debería mostrar error 500', () => {
    const error = { status: 500 };
    cuentaServiceSpy.getCuentas.and.returnValue(throwError(error));

    component.ngOnInit();

    expect(Swal.fire).toHaveBeenCalledWith('Error', 'Error del servidor. Intente más tarde.', 'error');
  });

  it('cancelar debería cerrar el modal', () => {
    component.cancelar();

    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('debería mostrar un mensaje personalizado si se recibe un error', () => {
    const mensajeServidor = 'Mensaje personalizado';
    const error = { error: { message: mensajeServidor } };

    cuentaServiceSpy.getCuentas.and.returnValue(throwError(error));

    component.ngOnInit();

    expect(Swal.fire).toHaveBeenCalledWith('Error', mensajeServidor, 'error');
  });

  it('debería mostrar mensaje "No se encontraron resultados." si error 404', () => {
    const error404 = { status: 404 };
    cuentaServiceSpy.getCuentas.and.returnValue(throwError(error404));

    component.data = { cuentaOrigenId: '1' };
    component.ngOnInit();

    expect(swalSpy).toHaveBeenCalledWith('Error', 'No se encontraron resultados.', 'error');
  });

  it('debería filtrar cuentas destino excluyendo la cuenta origen', () => {
    const cuentasMock: CuentaBancaria[] = [
      { id: '1', nombre: 'Cuenta 1', apellido: 'Perez', saldo: 1000, activa: true, numeroCuenta: '123456' },
      { id: '2', nombre: 'Cuenta 2', apellido: 'Lopez', saldo: 2000, activa: false, numeroCuenta: '654321' },
      { id: '3', nombre: 'Cuenta 3', apellido: 'Gomez', saldo: 1500, activa: true, numeroCuenta: '111222' }
    ];

    component.data = { cuentaOrigenId: '2' };
    cuentaServiceSpy.getCuentas.and.returnValue(of(cuentasMock));

    component.ngOnInit();

    expect(component.cuentasDestino.length).toBe(2);
    expect(component.cuentasDestino).toEqual([
      { id: '1', nombre: 'Cuenta 1', apellido: 'Perez', saldo: 1000, activa: true, numeroCuenta: '123456' },
      { id: '3', nombre: 'Cuenta 3', apellido: 'Gomez', saldo: 1500, activa: true, numeroCuenta: '111222' }
    ]);

    expect(component.cuentasDestino.some(c => c.id === component.data.cuentaOrigenId)).toBeFalse();
  });


});
