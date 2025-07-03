package com.banking.models.dtos;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CuentaBancariaDTO {
    @Schema(description = "Nombre del titular de la cuenta", example = "Martin")
    private String nombre;

    @Schema(description = "Apellido del titular de la cuenta", example = "Perez")
    private String apellido;
    
}
