package com.banking.banking_backend.services;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import com.banking.excepciones.RecursoNoEncontradoException;
import com.banking.models.documents.CuentaBancaria;
import com.banking.models.dtos.CuentaBancariaDTO;
import com.banking.models.dtos.SaldoDTO;
import com.banking.repositories.CuentaBancariaRepository;
import com.banking.services.CuentaBancariaService;

@ExtendWith(MockitoExtension.class)
class CuentaBancariaServiceTest {

    @Mock
    private CuentaBancariaRepository cuentaBancariaRepository;

    @InjectMocks
    private CuentaBancariaService cuentaBancariaService;

    @Test
    public void testCrearCuentaBancaria() {
        CuentaBancariaDTO cuentaDTO = new CuentaBancariaDTO("Juan", "Perez");

        Mockito.when(cuentaBancariaRepository.existsByNumeroCuenta(Mockito.anyString()))
           .thenReturn(false);

        CuentaBancaria cuentaGuardada = CuentaBancaria.builder()
                .id("abc1234")
                .nombre("Juan")
                .apellido("Perez")
                .activa(true)
                .saldo(0)
                .build();

        Mockito.when(cuentaBancariaRepository.save(Mockito.any(CuentaBancaria.class)))
                .thenReturn(cuentaGuardada);

        CuentaBancaria resultado = cuentaBancariaService.crearCuentaBancaria(cuentaDTO);

        Assertions.assertNotNull(resultado);
        Assertions.assertEquals("abc1234", resultado.getId());
        Assertions.assertEquals("Juan", resultado.getNombre());
        Assertions.assertEquals(0, resultado.getSaldo());
    }

    @Test
    void eliminarCuentaExistenteCambiaActivaGuarda(){
    String id = "abc1234";
    
    CuentaBancaria cuenta = CuentaBancaria.builder()
            .id(id)
            .activa(true)
            .saldo(0)
            .build();

    Mockito.when(cuentaBancariaRepository.findByIdAndActivaTrue(id)).thenReturn(cuenta);
    Mockito.when(cuentaBancariaRepository.save(Mockito.any(CuentaBancaria.class)))
        .thenReturn(cuenta);

        
    CuentaBancaria resultado = cuentaBancariaService.eliminarCuenta(id);

    Assertions.assertFalse(resultado.isActiva());
    }

    @Test
    void obtenerCuentaActivaExistente(){
      String id="abc1234";

        CuentaBancaria cuentaGuardada = CuentaBancaria.builder()
                .id(id)
                .nombre("Juan")
                .apellido("Perez")
                .activa(true)
                .saldo(0)
                .build();

        Mockito.when(cuentaBancariaRepository.findByIdAndActivaTrue(id))
                .thenReturn(cuentaGuardada);
        
        CuentaBancaria resultado= cuentaBancariaService.obtenerCuentaPorId(id);

        Assertions.assertNotNull(resultado);
        Assertions.assertEquals("abc1234", resultado.getId());
        Assertions.assertEquals("Juan", resultado.getNombre());
        Assertions.assertEquals(0, resultado.getSaldo());
    }

    @Test
    void actualizarSaldoCuentaExistente(){
    String idCuenta="abc124";
    double nuevoSaldo=2500.0;

    SaldoDTO saldoDTO= new SaldoDTO(idCuenta, nuevoSaldo);

    CuentaBancaria cuentaExistente= CuentaBancaria.builder()
        .id(idCuenta)
        .nombre("Juan")
        .apellido("Perez")
        .activa(true)
        .saldo(500)
        .build();

        Mockito.when(cuentaBancariaRepository.findByIdAndActivaTrue(idCuenta))
        .thenReturn(cuentaExistente);

        Mockito.when(cuentaBancariaRepository.save(Mockito.any(CuentaBancaria.class)))
        .thenReturn(cuentaExistente);

        CuentaBancaria resultado= cuentaBancariaService.actualizarSaldo(saldoDTO);

        Assertions.assertNotNull(resultado);
        Assertions.assertEquals(nuevoSaldo, resultado.getSaldo());
      }

   @Test
   void actualizarSaldoCuentaInexistenteLanzaExcepcion() {
    String cuentaId = "inexistente";
    SaldoDTO saldoDTO = new SaldoDTO(cuentaId, 1000);

    Mockito.when(cuentaBancariaRepository.findByIdAndActivaTrue(cuentaId))
            .thenReturn(null);

    Assertions.assertThrows(RecursoNoEncontradoException.class, () -> {
        cuentaBancariaService.actualizarSaldo(saldoDTO);
    });
}

}
