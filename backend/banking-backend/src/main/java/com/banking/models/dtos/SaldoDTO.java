package com.banking.models.dtos;

import javax.validation.constraints.NotBlank;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaldoDTO {
   @NotBlank(message = "El ID de la cuenta no puede estar vacío")
   @Schema(description = "ID de la cuenta bancaria")
   private String cuentaId;
   @Schema(description = "Nuevo saldo", example = "1000.50")
   private double saldo;
}
