package com.banking.excepciones;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ErrorResponse {
    private String error;
    private String mensaje;
    private Integer codigo;

    public ErrorResponse(Exception ex, Integer codigo) {
        this.error= ex.getClass().getSimpleName();
        this.codigo = codigo;
    }

    public ErrorResponse(String error, String mensaje, Integer codigo) {
        this.error = error;
        this.mensaje = mensaje;
        this.codigo = codigo;
    }
    
    
}
