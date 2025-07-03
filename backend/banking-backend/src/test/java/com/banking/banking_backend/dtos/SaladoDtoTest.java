package com.banking.banking_backend.dtos;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import com.banking.models.dtos.SaldoDTO;

@ExtendWith(MockitoExtension.class)
public class SaladoDtoTest {

     @Test
    void testConstructorYGetters() {
        SaldoDTO saldoDTO = new SaldoDTO("abc123", 1500.0);

        assertEquals("abc123", saldoDTO.getCuentaId());
        assertEquals(1500.0, saldoDTO.getSaldo());
    }

    @Test
    void testSetters() {
        SaldoDTO saldoDTO = new SaldoDTO();
        saldoDTO.setCuentaId("xyz789");
        saldoDTO.setSaldo(2000.0);

        assertEquals("xyz789", saldoDTO.getCuentaId());
        assertEquals(2000.0, saldoDTO.getSaldo());
    }

    @Test
    void testEqualsAndHashCode() {
        SaldoDTO dto1 = new SaldoDTO("abc123", 1000.0);
        SaldoDTO dto2 = new SaldoDTO("abc123", 1000.0);

        assertEquals(dto1, dto2);
        assertEquals(dto1.hashCode(), dto2.hashCode());
    }

    @Test
    void testToString() {
        SaldoDTO saldoDTO = new SaldoDTO("cuenta1", 500.0);
        String result = saldoDTO.toString();

        assertTrue(result.contains("cuentaId=cuenta1"));
        assertTrue(result.contains("saldo=500.0"));
    }

}
