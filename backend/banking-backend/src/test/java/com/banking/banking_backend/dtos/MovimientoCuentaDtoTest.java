package com.banking.banking_backend.dtos;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import com.banking.models.dtos.MovimientoCuentaDTO;

import org.junit.jupiter.api.Assertions;


@ExtendWith(MockitoExtension.class)
public class MovimientoCuentaDtoTest {
    @Test
    void testConstructorYGetters() {
        MovimientoCuentaDTO dto = new MovimientoCuentaDTO("cuenta1", "cuenta2", 1500.0);

        Assertions.assertEquals("cuenta1", dto.getCuentaOrigenId());
        Assertions.assertEquals("cuenta2", dto.getCuentaDestinoId());
        Assertions.assertEquals(1500.0, dto.getMonto());
    }

    @Test
    void testSetters() {
        MovimientoCuentaDTO dto = new MovimientoCuentaDTO();
        dto.setCuentaOrigenId("origen");
        dto.setCuentaDestinoId("destino");
        dto.setMonto(200.0);

        Assertions.assertEquals("origen", dto.getCuentaOrigenId());
        Assertions.assertEquals("destino", dto.getCuentaDestinoId());
        Assertions.assertEquals(200.0, dto.getMonto());
    }

    @Test
    void testEqualsAndHashCode() {
        MovimientoCuentaDTO dto1 = new MovimientoCuentaDTO("a", "b", 100.0);
        MovimientoCuentaDTO dto2 = new MovimientoCuentaDTO("a", "b", 100.0);

        Assertions.assertEquals(dto1, dto2);
        Assertions.assertEquals(dto1.hashCode(), dto2.hashCode());
    }

    @Test
    void testToString() {
        MovimientoCuentaDTO dto = new MovimientoCuentaDTO("123a", "231b", 50.0);

        String str = dto.toString();

        Assertions.assertTrue(str.contains("123a"));
        Assertions.assertTrue(str.contains("231b"));
        Assertions.assertTrue(str.contains("50.0"));
    }

}
