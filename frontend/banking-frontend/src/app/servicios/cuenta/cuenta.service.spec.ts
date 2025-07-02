import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CuentaService } from './cuenta.service';
import { CuentaBancaria } from 'src/app/interfaces/cuentaBancaria.model';
import { CuentaBancariaRequest } from 'src/app/interfaces/cuentaBancariaRequest.model';
import { Saldo } from 'src/app/interfaces/saldo.model';

describe('CuentaService', () => {
  let service: CuentaService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CuentaService]
    });
    service = TestBed.inject(CuentaService);
    httpTestingController = TestBed.inject(HttpTestingController);

  });
  
  afterEach(() => {
    httpTestingController.verify();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('deberia obtener todas las cuentas bancarias', () => {
    const mockCuentas: CuentaBancaria[] = [
      {
        id: '1',
        saldo: 0,
        activa: true,
        nombre: 'Maria',
        apellido: 'Perez',
        numeroCuenta: 'acb123'
      }
    ];

    service.getCuentas().subscribe(cuentas => {
      expect(cuentas).toEqual(mockCuentas);
    });

    const req = httpTestingController.expectOne('http://localhost:8080/accounts');
    expect(req.request.method).toBe('GET');

    req.flush(mockCuentas)
  });

  it('deberia obtener una cuenta bancaria por ID', () => {
    const mockCuenta: CuentaBancaria = {
      id: '1',
      saldo: 0,
      activa: true,
      nombre: 'Juan',
      apellido: 'Perez',
      numeroCuenta: 'acb123'
    };
    service.getCuentaPorId('1').subscribe(cuenta => {
      expect(cuenta).toEqual(mockCuenta);
    });
    const req = httpTestingController.expectOne('http://localhost:8080/accounts/1');
    expect(req.request.method).toBe('GET');

    req.flush(mockCuenta)
  });

  it('deberia crear cuenta bancaria', () => {
    const mockCuenta: CuentaBancariaRequest = {
      nombre: 'Perez',
      apellido: 'acb123'
    };

    const mockCuentaGuardada = {
      id: '1',
      saldo: 0,
      activa: true,
      nombre: 'Juan',
      apellido: 'Perez',
      numeroCuenta: 'acb123'
    };

    service.crearCuenta(mockCuenta).subscribe(cuenta => {
      expect(cuenta).toEqual(mockCuentaGuardada);
    });
    const req = httpTestingController.expectOne('http://localhost:8080/accounts');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockCuenta);

    req.flush(mockCuentaGuardada);
  });

  it('deberia eliminar una cuenta bancaria por su ID', () => {
    const mockCuenta: CuentaBancaria =
    {
      id: '1',
      saldo: 0,
      activa: false,
      nombre: 'Maria',
      apellido: 'Perez',
      numeroCuenta: 'acb123'
    };

    service.eliminarCuenta('1').subscribe(cuenta => {
      expect(cuenta).toEqual(mockCuenta);
    });

    const req = httpTestingController.expectOne('http://localhost:8080/accounts/1');
    expect(req.request.method).toBe('DELETE');
    expect(req.request.body).toBeNull();

    req.flush(mockCuenta)
  });

  it('deberia manejar error(not found) si no se encuentra la cuenta por ID', () => {
    const errorMessage = 'Cuenta bancaria no encontrada';

    service.getCuentaPorId('1a').subscribe({
      next: () => fail('Se esperaba un error, no una cuenta'),
      error: (error) => {
        expect(error.status).toBe(404);
        expect(error.statusText).toBe('Not Found');
      }
    });

    const req = httpTestingController.expectOne('http://localhost:8080/accounts/1a');
    expect(req.request.method).toBe('GET');

    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });

  it('deberia manejar error si no se encuentra la cuenta a eliminar', () => {
    const errorMessage = 'Cuenta bancaria no encontrada';

    service.eliminarCuenta('1').subscribe({
      next: () => fail('Se esperaba un error al eliminar'),
      error: (error) => {
        expect(error.status).toBe(404);
        expect(error.statusText).toBe('Not Found');
      }
    });

    const req = httpTestingController.expectOne('http://localhost:8080/accounts/1');
    expect(req.request.method).toBe('DELETE');

    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });


  it('debería actualizar el saldo mediante PUT', () => {
    const dto: Saldo = {
      cuentaId: '123',
      saldo: 1500
    };

    const mockResponse = { success: true }; // o lo que esperes del backend

    service.actualizarSaldo(dto).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`http://localhost:8080/accounts/actualizar-saldo`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(dto);

    req.flush(mockResponse);
  });
});
