package com.banking.banking_backend.dtos;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDateTime;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import com.banking.models.dtos.MovimientoDTOResponse;

@ExtendWith(MockitoExtension.class)
public class MovimientoDTOResponseTest {

     @Test
    void testConstructorYGetters() {
        LocalDateTime fecha = LocalDateTime.of(2025, 7, 2, 15, 30);
        MovimientoDTOResponse dto = new MovimientoDTOResponse("12345", "Juan Perez", 1000.0, fecha);

        assertEquals("12345", dto.getCuentaID());
        assertEquals("Juan Perez", dto.getNombreCompletoContraparte());
        assertEquals(1000.0, dto.getMonto());
        assertEquals(fecha, dto.getFecha());
    }

    @Test
    void testSetters() {
        MovimientoDTOResponse dto = new MovimientoDTOResponse();

        LocalDateTime fecha = LocalDateTime.now();
        dto.setCuentaID("54321");
        dto.setNombreCompletoContraparte("Ana Gómez");
        dto.setMonto(500.0);
        dto.setFecha(fecha);

        assertEquals("54321", dto.getCuentaID());
        assertEquals("Ana Gómez", dto.getNombreCompletoContraparte());
        assertEquals(500.0, dto.getMonto());
        assertEquals(fecha, dto.getFecha());
    }

    @Test
    void testEqualsAndHashCode() {
        LocalDateTime fecha = LocalDateTime.of(2025, 7, 2, 15, 30);
        MovimientoDTOResponse dto1 = new MovimientoDTOResponse("12345", "Juan Perez", 1000.0, fecha);
        MovimientoDTOResponse dto2 = new MovimientoDTOResponse("12345", "Juan Perez", 1000.0, fecha);

        assertEquals(dto1, dto2);
        assertEquals(dto1.hashCode(), dto2.hashCode());
    }

    @Test
    void testToString() {
        LocalDateTime fecha = LocalDateTime.of(2025, 7, 2, 15, 30);
        MovimientoDTOResponse dto = new MovimientoDTOResponse("12345", "Juan Perez", 1000.0, fecha);

        String resultado = dto.toString();

        assertTrue(resultado.contains("cuentaID=12345"));
        assertTrue(resultado.contains("nombreCompletoContraparte=Juan Perez"));
        assertTrue(resultado.contains("monto=1000.0"));
        assertTrue(resultado.contains("fecha=" + fecha.toString()));
    }
}
