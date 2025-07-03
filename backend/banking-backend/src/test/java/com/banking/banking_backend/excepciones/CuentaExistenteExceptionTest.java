package com.banking.banking_backend.excepciones;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;

import com.banking.excepciones.CuentaExistenteException;

public class CuentaExistenteExceptionTest {
 @Test
    void testExceptionMessage() {
        String mensaje = "Cuenta existente";

        CuentaExistenteException ex = new CuentaExistenteException(mensaje);

        assertEquals(mensaje, ex.getMessage());
        assertTrue(ex instanceof RuntimeException);
    }
}
