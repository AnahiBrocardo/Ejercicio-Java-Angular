import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCuentaComponent } from './editar-cuenta.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { CuentaBancaria } from 'src/app/interfaces/cuentaBancaria.model';
import { FileDetector } from 'protractor';

describe('EditarCuentaComponent', () => {
  let component: EditarCuentaComponent;
  let fixture: ComponentFixture<EditarCuentaComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<EditarCuentaComponent>>;

  const mockCuenta: CuentaBancaria = {
    id: '1',
    saldo: 1000,
    activa: true,
    nombre: 'Ana',
    apellido: 'Perez',
    numeroCuenta: 'ABC123'
  };

  beforeEach(() => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
      declarations: [EditarCuentaComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: { id: '123', saldo: 1000 } }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EditarCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario con el saldo de la cuenta', () => {
    expect(component.formSaldo.value.saldo).toBe(mockCuenta.saldo);
  });

  it('debería cerrar el modal devolviendo el nuevo saldo si el formulario es válido', () => {
    component.formSaldo.setValue({ saldo: 1500 });

    component.guardar();

    expect(dialogRefSpy.close).toHaveBeenCalledWith({
      cuentaId: '123',
      saldo: 1500
    });
  });

  it('no debería cerrar el diálogo si el formulario es inválido', () => {
    component.formSaldo.setValue({ saldo: -100 });
    expect(component.formSaldo.invalid).toBeTrue();

    component.guardar();

    expect(dialogRefSpy.close).not.toHaveBeenCalled();
  });

  it('debería cerrar el diálogo con "Cancelado" al cancelar', () => {
    component.cancelar();
    expect(dialogRefSpy.close).toHaveBeenCalledWith('Cancelado');
  });
});
