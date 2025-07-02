import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaPageComponent } from './cuenta-page.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TransferenciaComponent } from '../modales/transferencia/transferencia.component';
import { of } from 'rxjs';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';

describe('CuentaPageComponent', () => {
  let component: CuentaPageComponent;
  let fixture: ComponentFixture<CuentaPageComponent>;
  let dialog: jasmine.SpyObj<MatDialog>;
  let router: jasmine.SpyObj<Router>;
  let dialogRefSpyObj: jasmine.SpyObj<MatDialogRef<any>>;
  const activatedRoute = {

    snapshot: {
      paramMap: {
        get: (key: string) => '123'
      }
    }
  };

  beforeEach(() => {
    dialogRefSpyObj = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefSpyObj.afterClosed.and.returnValue(of(null));

    dialog = jasmine.createSpyObj('MatDialog', ['open']);
    dialog.open.and.returnValue(dialogRefSpyObj); // 👈 ahora sí retorna algo válido

    router = jasmine.createSpyObj('Router', ['navigateByUrl']);


    TestBed.configureTestingModule({
      declarations: [CuentaPageComponent],
      providers: [
        { provide: Router, useValue: router },
        { provide: MatDialog, useValue: dialog },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CuentaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('debería obtener el ID de la ruta al inicializar el componente', () => {
    component.ngOnInit();

    expect(component.idCuenta).toBe('123');
  });

  it('debería abrir el modal de transferencia con el ID de cuenta', () => {
    component.irATransferencia();

    expect(dialog.open).toHaveBeenCalledWith(
      TransferenciaComponent,
      jasmine.objectContaining({
        width: '500px',
        data: { cuentaOrigenId: '123' }
      })
    );
  });


  it('debería navegar a la página principal al hacer click en volverALista', () => {
    const router = TestBed.inject(Router);

    component.volverALista();

    expect(router.navigateByUrl).toHaveBeenCalledWith('');
  });

  it('debería mostrar "Error del servidor" si el status es 500', () => {
    const error = new HttpErrorResponse({
      status: 500,
      statusText: 'Internal Server Error'
    });

    const swalSpy = spyOn(Swal, 'fire');

    component.handleError(error);

    expect(swalSpy).toHaveBeenCalledWith('Error', 'Error del servidor.', 'error');
  });

  it('debería mostrar "No se encontraron resultados" si el status es 404', () => {
    const error = new HttpErrorResponse({
      status: 404,
      statusText: 'Not Found'
    });

    spyOn(Swal, 'fire');

    component.handleError(error);

    expect(Swal.fire).toHaveBeenCalledWith('Error', 'No se encontraron resultados.', 'error');
  });

  it('debería mostrar el mensaje del error si existe error', () => {
    const error = new HttpErrorResponse({
      status: 400,
      error: { message: 'Mensaje personalizado del backend' }
    });

    spyOn(Swal, 'fire');

    component.handleError(error);

    expect(Swal.fire).toHaveBeenCalledWith('Error', 'Mensaje personalizado del backend', 'error');
  });

});
