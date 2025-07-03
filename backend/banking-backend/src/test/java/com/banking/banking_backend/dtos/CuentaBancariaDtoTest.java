package com.banking.banking_backend.dtos;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import com.banking.models.dtos.CuentaBancariaDTO;

@ExtendWith(MockitoExtension.class)
public class CuentaBancariaDtoTest {

     @Test
    void testConstructorYGetters() {
        CuentaBancariaDTO dto = new CuentaBancariaDTO("Juan", "Pérez");

        assertEquals("Juan", dto.getNombre());
        assertEquals("Pérez", dto.getApellido());
    }

    @Test
    void testSetters() {
        CuentaBancariaDTO dto = new CuentaBancariaDTO();
        dto.setNombre("Ana");
        dto.setApellido("Gómez");

        assertEquals("Ana", dto.getNombre());
        assertEquals("Gómez", dto.getApellido());
    }

    @Test
    void testEqualsAndHashCode() {
        CuentaBancariaDTO dto1 = new CuentaBancariaDTO("Carlos", "Lopez");
        CuentaBancariaDTO dto2 = new CuentaBancariaDTO("Carlos", "Lopez");

        assertEquals(dto1, dto2);
        assertEquals(dto1.hashCode(), dto2.hashCode());
    }

    @Test
    void testToString() {
        CuentaBancariaDTO dto = new CuentaBancariaDTO("Lucía", "Martínez");
        String resultado = dto.toString();

        assertTrue(resultado.contains("nombre=Lucía"));
        assertTrue(resultado.contains("apellido=Martínez"));
    }
}
