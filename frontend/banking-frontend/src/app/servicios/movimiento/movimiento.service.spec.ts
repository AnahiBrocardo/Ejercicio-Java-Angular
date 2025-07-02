import { TestBed } from '@angular/core/testing';

import { MovimientoService } from './movimiento.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MovimientoDTO } from 'src/app/interfaces/movimiento.model';

describe('MovimientoService', () => {
  let service: MovimientoService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovimientoService]
    });
    service = TestBed.inject(MovimientoService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('deberia obtener todos los movimientos de una cuenta por su ID', () => {
    const mockMovimientos: MovimientoDTO[] = [{
      cuentaOrigenId: '111a',
      cuentaDestinoId: '222b',
      monto: 500,
      fecha: '2025-05-17'
    }
    ];

    service.getMovimientoPorId('111a').subscribe(movimientos => {
      expect(movimientos).toEqual(mockMovimientos);
    });
    const req = httpTestingController.expectOne('http://localhost:8080/movimientos/111a');
    expect(req.request.method).toBe('GET');
    req.flush(mockMovimientos);

  });

  it('deberia crear un nuevo moviento', () => {
    const mockMovimiento: MovimientoDTO = {
      cuentaOrigenId: '111a',
      cuentaDestinoId: '222b',
      monto: 500,
      fecha: ''
    }

    service.crearTransferencia(mockMovimiento).subscribe(movimientos => {
      expect(movimientos).toEqual(mockMovimiento);
    });
    const req = httpTestingController.expectOne('http://localhost:8080/movimientos');
    expect(req.request.method).toBe('POST');
    req.flush(mockMovimiento);

  });

  it('deberia manejar error si se buscan movimientos para una cuenta con ID inexistente', () => {
    const errorMsg = 'Cuenta no encontrada';

    service.getMovimientoPorId('idInvalido').subscribe({
      next: () => fail('deberia haber fallado'),
      error: error => {
        expect(error.status).toBe(404);
        expect(error.error).toBe(errorMsg);
      }
    });

    const req = httpTestingController.expectOne('http://localhost:8080/movimientos/idInvalido');
    expect(req.request.method).toBe('GET');
    req.flush(errorMsg, { status: 404, statusText: 'Not Found' });
  });

});
