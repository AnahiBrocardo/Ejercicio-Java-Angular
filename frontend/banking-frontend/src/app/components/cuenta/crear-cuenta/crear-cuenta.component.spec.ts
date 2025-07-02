import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCuentaComponent } from './crear-cuenta.component';
import { MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';

describe('CrearCuentaComponent', () => {
  let component: CrearCuentaComponent;
  let fixture: ComponentFixture<CrearCuentaComponent>;
  let dialog: jasmine.SpyObj<MatDialogRef<CrearCuentaComponent>>;

  beforeEach(() => {
    dialog = jasmine.createSpyObj('MatDialog', ['close']);
    TestBed.configureTestingModule({
      declarations: [CrearCuentaComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: MatDialogRef, useValue: dialog }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería cerrar el modal con los datos del formulario si es válido', () => {
    component.formCrearCuenta.setValue({ nombre: 'Belen', apellido: 'Gonzales' });

    component.guardar();

    expect(dialog.close).toHaveBeenCalledWith({
      nombre: 'Belen',
      apellido: 'Gonzales'
    });
  });

  it('no debería cerrar el modal si el formulario es inválido', () => {
    component.formCrearCuenta.setValue({ nombre: '', apellido: '' });

    component.guardar();

    expect(dialog.close).not.toHaveBeenCalled();
  });

  it('debería llamar a markAllAsTouched y no cerrar el modal si el formulario es inválido', () => {
    component.formCrearCuenta.setValue({ nombre: '', apellido: '' });

    spyOn(component.formCrearCuenta, 'markAllAsTouched');

    component.guardar();

    expect(component.formCrearCuenta.markAllAsTouched).toHaveBeenCalled();
    expect(dialog.close).not.toHaveBeenCalled();
  });

});
