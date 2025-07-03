package com.banking.banking_backend.documents;

import java.time.LocalDateTime;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import com.banking.models.documents.MovimientoCuenta;

@ExtendWith(MockitoExtension.class)
public class MovimientoCuentaTest {
    @Test
    void testEqualsAndHashCode() {
        LocalDateTime fecha = LocalDateTime.now();

        MovimientoCuenta m1 = MovimientoCuenta.builder()
                .id("mov1")
                .cuentaOrigenId("cuenta1")
                .cuentaDestinoId("cuenta2")
                .monto(1000.0)
                .fecha(fecha)
                .activa(true)
                .build();

        MovimientoCuenta m2 = MovimientoCuenta.builder()
                .id("mov1")
                .cuentaOrigenId("cuenta1")
                .cuentaDestinoId("cuenta2")
                .monto(1000.0)
                .fecha(fecha)
                .activa(true)
                .build();

        Assertions.assertEquals(m1, m2);
        Assertions.assertEquals(m1.hashCode(), m2.hashCode());
    }

    @Test
    void testToString() {
        MovimientoCuenta movimiento = MovimientoCuenta.builder()
                .id("mov1")
                .cuentaOrigenId("cuenta1")
                .cuentaDestinoId("cuenta2")
                .monto(500.0)
                .fecha(LocalDateTime.of(2024, 1, 1, 10, 30))
                .activa(true)
                .build();

        String result = movimiento.toString();

        Assertions.assertTrue(result.contains("cuentaOrigenId=cuenta1"));
        Assertions.assertTrue(result.contains("cuentaDestinoId=cuenta2"));
        Assertions.assertTrue(result.contains("monto=500.0"));
    }

    @Test
    void testGettersAndSetters() {
        MovimientoCuenta movimiento = new MovimientoCuenta();
        movimiento.setId("m123");
        movimiento.setCuentaOrigenId("origen");
        movimiento.setCuentaDestinoId("destino");
        movimiento.setMonto(300.0);
        movimiento.setFecha(LocalDateTime.of(2025, 1, 1, 12, 0));
        movimiento.setActiva(false);

        Assertions.assertEquals("m123", movimiento.getId());
        Assertions.assertEquals("origen", movimiento.getCuentaOrigenId());
        Assertions.assertEquals("destino", movimiento.getCuentaDestinoId());
        Assertions.assertEquals(300.0, movimiento.getMonto());
        Assertions.assertEquals(LocalDateTime.of(2025, 1, 1, 12, 0), movimiento.getFecha());
        Assertions.assertFalse(movimiento.isActiva());
    }

}
