import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ListarCuentasComponent } from './listar-cuentas.component';
import { of } from 'rxjs';
import { CuentaService } from 'src/app/servicios/cuenta/cuenta.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

describe('ListarCuentasComponent', () => {
  let component: ListarCuentasComponent;
  let fixture: ComponentFixture<ListarCuentasComponent>;
  let cuentaServiceMock: any;
  let routerMock: any;
  let dialogMock: any;

  beforeEach(async(async () => {
    cuentaServiceMock = {
      getCuentas: jasmine.createSpy('getCuentas').and.returnValue(of([
        { id: '1', nombre: 'Ana', apellido: 'Brocardo', numeroCuenta: '12345' }
      ])),
      onCuentaActualizada: jasmine.createSpy('onCuentaActualizada').and.returnValue(of())
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    dialogMock = {
      open: jasmine.createSpy('open').and.returnValue({ afterClosed: () => of(null) })
    };

    await TestBed.configureTestingModule({
      declarations: [ListarCuentasComponent],
      providers: [
        { provide: CuentaService, useValue: cuentaServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: MatDialog, useValue: dialogMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ListarCuentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  }));

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar las cuentas al iniciar', () => {
    expect(cuentaServiceMock.getCuentas).toHaveBeenCalled();
    expect(component.cuentas.length).toBeGreaterThanOrEqual(0);
    expect(component.cuentas[0].nombre).toBe('Ana');
  });

  it('debería navegar al detalle de cuenta', () => {
    const cuenta = { id: '123' } as any;
    component.verDetalle(cuenta);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/cuenta', '123']);
  });
})