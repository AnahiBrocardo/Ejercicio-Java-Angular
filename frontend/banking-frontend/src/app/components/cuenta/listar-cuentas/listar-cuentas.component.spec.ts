import { of, Subject, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { CuentaService } from 'src/app/servicios/cuenta/cuenta.service';
import { ListarCuentasComponent } from './listar-cuentas.component';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { CuentaBancaria } from 'src/app/interfaces/cuentaBancaria.model';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';


describe('ListarCuentasComponent', () => {
  let component: ListarCuentasComponent;
  let fixture: ComponentFixture<ListarCuentasComponent>;
  let cuentaServiceSpy: jasmine.SpyObj<CuentaService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let matDialogMock: jasmine.SpyObj<MatDialog>;

  const mockCuentas: CuentaBancaria[] = [
    {
      id: '1',
      nombre: 'Cuenta 1',
      apellido: 'Perez',
      saldo: 1000,
      activa: true,
      numeroCuenta: '12345678'
    },
    {
      id: '2',
      nombre: 'Cuenta 2',
      apellido: 'Lopez',
      saldo: 2000,
      activa: false,
      numeroCuenta: '87654321'
    }
  ];


  beforeEach(async () => {
    cuentaServiceSpy = jasmine.createSpyObj('CuentaService',
      ['getCuentas',
        'getCuentas',
        'onCuentaActualizada',
        'actualizarSaldo',
        'eliminarCuenta',
        'crearCuenta'
      ]);

    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    matDialogMock = jasmine.createSpyObj('MatDialog', ['open']);

    cuentaServiceSpy.getCuentas.and.returnValue(of(mockCuentas));
    cuentaServiceSpy.onCuentaActualizada.and.returnValue(of('valorMock'));


    await TestBed.configureTestingModule({
      declarations: [ListarCuentasComponent],
      imports: [MatDialogModule],
      providers: [
        { provide: CuentaService, useValue: cuentaServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: MatDialog, useValue: matDialogMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListarCuentasComponent);
    component = fixture.componentInstance;
  });

  it('debería cargar las cuentas al iniciar', () => {
    cuentaServiceSpy.getCuentas.and.returnValue(of(mockCuentas));

    fixture.detectChanges();

    expect(cuentaServiceSpy.getCuentas).toHaveBeenCalled();
    expect(component.cuentas).toEqual(mockCuentas);
  });

  it('debería navegar al detalle de cuenta', () => {
    const cuentaMock: CuentaBancaria = {
      id: '1',
      nombre: 'Cuenta 1',
      apellido: 'Perez',
      saldo: 1000,
      activa: true,
      numeroCuenta: '12345678'
    };

    component.verDetalle(cuentaMock);

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/cuenta', cuentaMock.id]);
  });

  it('debería actualizar el saldo si se edita una cuenta correctamente', fakeAsync(() => {
    const cuentaMock = mockCuentas[0];
    const mockDialogRef = {
      afterClosed: () => of({ cuentaId: '1', saldo: 1500 })
    };

    cuentaServiceSpy.actualizarSaldo.and.returnValue(of(null));
    matDialogMock.open.and.returnValue(mockDialogRef as any);
    spyOn(component, 'obtenerCuentas');

    component.editarCuenta(cuentaMock);

    tick();
    flush();

    expect(matDialogMock.open).toHaveBeenCalled();
    expect(cuentaServiceSpy.actualizarSaldo).toHaveBeenCalledWith({ cuentaId: '1', saldo: 1500 });
    expect(component.obtenerCuentas).toHaveBeenCalled();
  }));

  it('debería manejar error al actualizar saldo', fakeAsync(() => {
    const cuentaMock = mockCuentas[0];
    const resultMock = { cuentaId: '1', saldo: 1500 };
    const errorMock = { status: 500, error: { message: 'Error del servidor' } };

    const mockDialogRef = {
      afterClosed: () => of(resultMock)
    } as any;

    matDialogMock.open.and.returnValue(mockDialogRef);
    cuentaServiceSpy.actualizarSaldo.and.returnValue(throwError(errorMock));
    spyOn(component, 'handleError');

    component.editarCuenta(cuentaMock);

    tick();
    flush();

    expect(cuentaServiceSpy.actualizarSaldo).toHaveBeenCalledWith(resultMock);
    expect(component.handleError).toHaveBeenCalledWith(errorMock);
  }));

  it('debería manejar errores al obtener cuentas', () => {
    const errorMock = { status: 500, error: { message: 'Error del servidor' } };

    spyOn(component as any, 'handleError');
    cuentaServiceSpy.getCuentas.and.returnValue(throwError(errorMock));

    component.obtenerCuentas();

    expect((component as any).handleError).toHaveBeenCalledWith(errorMock);
  });


  it('debería eliminar la cuenta cuando el usuario confirma', fakeAsync(() => {
    const cuentaMock: CuentaBancaria = {
      id: '1',
      nombre: 'Ana',
      apellido: 'Perez',
      saldo: 1000,
      activa: true,
      numeroCuenta: '123ABC'
    };

    const swalSpy = spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true }) as any);
    const eliminarSpy = cuentaServiceSpy.eliminarCuenta.and.returnValue(of(null));
    const obtenerSpy = spyOn(component, 'obtenerCuentas');

    component.eliminarCuenta(cuentaMock);

    flush();

    expect(swalSpy).toHaveBeenCalled();
    expect(eliminarSpy).toHaveBeenCalledWith('1');
    expect(obtenerSpy).toHaveBeenCalled();
  }));

  it('debería abrir diálogo crear cuenta y crear cuenta correctamente', fakeAsync(() => {
    const mockDialogRef = {
      afterClosed: () => of({ nombre: 'Nueva Cuenta', apellido: 'Apellido', saldo: 500, activa: true, numeroCuenta: '5555' })
    } as any;

    matDialogMock.open.and.returnValue(mockDialogRef);
    cuentaServiceSpy.crearCuenta.and.returnValue(of({
      id: '3',
      nombre: 'Nueva Cuenta',
      apellido: 'Apellido',
      saldo: 500,
      activa: true,
      numeroCuenta: '5555'
    }));


    spyOn(component, 'obtenerCuentas');
    const swalSpy = spyOn(Swal, 'fire').and.returnValue(Promise.resolve() as any);

    component.crearCuenta();

    tick();
    flush();

    expect(matDialogMock.open).toHaveBeenCalled();
    expect(cuentaServiceSpy.crearCuenta).toHaveBeenCalledWith({ nombre: 'Nueva Cuenta', apellido: 'Apellido' });
    expect(swalSpy).toHaveBeenCalledWith('La cuenta bancaria ha sido creada correctamente', 'success');
    expect(component.obtenerCuentas).toHaveBeenCalled();
  }));

  it('debería manejar error si la creación de cuenta falla', fakeAsync(() => {
    const mockDialogRef = {
      afterClosed: () => of({ nombre: 'Nueva Cuenta', apellido: 'Apellido', saldo: 500, activa: true, numeroCuenta: '5555' })
    } as any;
    matDialogMock.open.and.returnValue(mockDialogRef);
    const errorResponse = { status: 500 };

    cuentaServiceSpy.crearCuenta.and.returnValue(throwError(errorResponse));

    const swalSpy = spyOn(Swal, 'fire').and.returnValue(Promise.resolve() as any);

    component.crearCuenta();

    tick();
    flush();

    expect(swalSpy).toHaveBeenCalledWith('Error', 'Error del servidor. Intente más tarde.', 'error');
  }));

  it('no debería llamar a crearCuenta si el diálogo se cierra sin resultado', fakeAsync(() => {
    const mockDialogRef = {
      afterClosed: () => of(null)
    } as unknown as MatDialogRef<any>;
    matDialogMock.open.and.returnValue(mockDialogRef);
    const crearCuentaSpy = cuentaServiceSpy.crearCuenta;

    component.crearCuenta();

    tick();

    expect(crearCuentaSpy).not.toHaveBeenCalled();
  }));

  it('debería mostrar mensaje personalizado cuando error.error.message existe', () => {
    const errorMock = {
      status: 400,
      error: { message: 'Mensaje personalizado del servidor' }
    };

    spyOn(component as any, 'handleError').and.callThrough();
    const swalSpy = spyOn(Swal, 'fire');

    cuentaServiceSpy.getCuentas.and.returnValue(throwError(errorMock));

    component.obtenerCuentas();

    expect(component['handleError']).toHaveBeenCalledWith(errorMock);
    expect(swalSpy).toHaveBeenCalledWith('Error', 'Mensaje personalizado del servidor', 'error');
  });

  it('debería mostrar mensaje personalizado cuando error.error.message existe', () => {
    const errorMock = {
      status: 400,
      error: { message: 'Mensaje personalizado del servidor' }
    };

    spyOn(component as any, 'handleError').and.callThrough();
    const swalSpy = spyOn(Swal, 'fire');

    cuentaServiceSpy.getCuentas.and.returnValue(throwError(errorMock));

    component.obtenerCuentas();

    expect(component['handleError']).toHaveBeenCalledWith(errorMock);
    expect(swalSpy).toHaveBeenCalledWith('Error', 'Mensaje personalizado del servidor', 'error');
  });

  it('debería mostrar mensaje "No se encontraron resultados." para error 404', () => {
    const error404 = { status: 404 };
    const swalSpy = spyOn(Swal, 'fire');

    component.handleError(error404);

    expect(swalSpy).toHaveBeenCalledWith('Error', 'No se encontraron resultados.', 'error');
  });

  it('debería llamar handleError si eliminarCuenta falla', fakeAsync(() => {
    const cuentaMock = { id: '1', nombre: 'Ana', apellido: 'Perez' } as CuentaBancaria;

    spyOn(Swal, 'fire').and.returnValue(Promise.resolve({ isConfirmed: true }) as any);

    const errorMock = { status: 500 };
    cuentaServiceSpy.eliminarCuenta.and.returnValue(throwError(errorMock));

    const handleErrorSpy = spyOn(component, 'handleError');

    component.eliminarCuenta(cuentaMock);

    flush();

    expect(handleErrorSpy).toHaveBeenCalledWith(errorMock);
  }));



});
