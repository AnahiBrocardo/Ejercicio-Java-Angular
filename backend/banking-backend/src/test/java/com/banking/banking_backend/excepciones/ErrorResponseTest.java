package com.banking.banking_backend.excepciones;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

import org.junit.jupiter.api.Test;

import com.banking.excepciones.ErrorResponse;

public class ErrorResponseTest {
    @Test
    void testConstructorConException() {
        Exception ex = new IllegalArgumentException("error");
        int codigo = 400;

        ErrorResponse errorResponse = new ErrorResponse(ex, codigo);

        assertEquals("IllegalArgumentException", errorResponse.getError());
        assertNull(errorResponse.getMensaje()); 
        assertEquals(codigo, errorResponse.getCodigo());
    }

    @Test
    void testConstructorCompleto() {
        String error = "ErrorPersonalizado";
        String mensaje = "Mensaje descriptivo";
        int codigo = 500;

        ErrorResponse errorResponse = new ErrorResponse(error, mensaje, codigo);

        assertEquals(error, errorResponse.getError());
        assertEquals(mensaje, errorResponse.getMensaje());
        assertEquals(codigo, errorResponse.getCodigo());
    }

    


    
}
