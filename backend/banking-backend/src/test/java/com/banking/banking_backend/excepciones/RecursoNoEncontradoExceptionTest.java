package com.banking.banking_backend.excepciones;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import com.banking.excepciones.RecursoNoEncontradoException;


public class RecursoNoEncontradoExceptionTest {

    @Test
    void testExceptionMessage() {
        String mensaje = "Recurso no encontrado";

        RecursoNoEncontradoException exception = new RecursoNoEncontradoException(mensaje);

        assertEquals(mensaje, exception.getMessage());
        assertTrue(exception instanceof RuntimeException);
    }
}
