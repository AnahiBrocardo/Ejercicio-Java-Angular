package com.banking.banking_backend.services;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.InjectMocks;

import com.banking.excepciones.TransferenciaInvalidaException;
import com.banking.models.documents.CuentaBancaria;
import com.banking.models.documents.MovimientoCuenta;
import com.banking.models.dtos.MovimientoCuentaDTO;
import com.banking.repositories.CuentaBancariaRepository;
import com.banking.repositories.MovimientoCuentaRepository;
import com.banking.services.MovimientoCuentaService;

@ExtendWith(MockitoExtension.class)
public class MovimientoCuentaServiceTest {
    @Mock
    MovimientoCuentaRepository movimientoCuentaRepository;
    
    @Mock
    private CuentaBancariaRepository cuentaBancariaRepository;

    @InjectMocks
    MovimientoCuentaService movimientoCuentaService;

    @Test
    public void testCrearMovimiento(){
    
    MovimientoCuentaDTO dto = new MovimientoCuentaDTO();
    dto.setCuentaOrigenId("origen123");
    dto.setCuentaDestinoId("destino456");
    dto.setMonto(1000.0);

    CuentaBancaria cuentaOrigen = CuentaBancaria.builder()
        .id("origen123")
        .saldo(2000)
        .activa(true)
        .build();

    CuentaBancaria cuentaDestino = CuentaBancaria.builder()
        .id("destino456")
        .saldo(500)
        .activa(true)
        .build();

    MovimientoCuenta movimientoEsperado = MovimientoCuenta.builder()
        .cuentaOrigenId("origen123")
        .cuentaDestinoId("destino456")
        .monto(1000.0)
        .activa(true)
        .build();

    Mockito.when(cuentaBancariaRepository.findByIdAndActivaTrue("origen123"))
        .thenReturn(cuentaOrigen);

    Mockito.when(cuentaBancariaRepository.findByIdAndActivaTrue("destino456"))
        .thenReturn(cuentaDestino);

    Mockito.when(movimientoCuentaRepository.save(Mockito.any(MovimientoCuenta.class)))
        .thenReturn(movimientoEsperado);

    MovimientoCuenta resultado = movimientoCuentaService.crearMovimiento(dto);

    Assertions.assertNotNull(resultado);
    Assertions.assertEquals("origen123", resultado.getCuentaOrigenId());
    Assertions.assertEquals("destino456", resultado.getCuentaDestinoId());
    Assertions.assertEquals(1000.0, resultado.getMonto());
    Assertions.assertTrue(resultado.isActiva());
  }

  @Test
   void testCrearMovimiento_SaldoInsuficiente() {
    
    MovimientoCuentaDTO dto = new MovimientoCuentaDTO();
    dto.setCuentaOrigenId("origen123");
    dto.setCuentaDestinoId("destino456");
    dto.setMonto(1500.0); 

    CuentaBancaria cuentaOrigen = CuentaBancaria.builder()
        .id("origen123")
        .saldo(1000.0) 
        .activa(true)
        .build();

    CuentaBancaria cuentaDestino = CuentaBancaria.builder()
        .id("destino456")
        .saldo(500.0)
        .activa(true)
        .build();

    Mockito.when(cuentaBancariaRepository.findByIdAndActivaTrue("origen123"))
        .thenReturn(cuentaOrigen);

    Mockito.when(cuentaBancariaRepository.findByIdAndActivaTrue("destino456"))
        .thenReturn(cuentaDestino);

    Assertions.assertThrows(TransferenciaInvalidaException.class, () -> {
        movimientoCuentaService.crearMovimiento(dto);
    });
  }

  @Test
   void testCrearMovimiento_CuentasIguales_LanzaExcepcion() {
    MovimientoCuentaDTO dto = new MovimientoCuentaDTO();
    dto.setCuentaOrigenId("mismaCuenta");
    dto.setCuentaDestinoId("mismaCuenta"); 
    dto.setMonto(500.0);

    Assertions.assertThrows(TransferenciaInvalidaException.class, () -> {
        movimientoCuentaService.crearMovimiento(dto);
    });
    }

}
