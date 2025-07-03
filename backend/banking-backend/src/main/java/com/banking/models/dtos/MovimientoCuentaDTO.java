package com.banking.models.dtos;

import javax.validation.constraints.NotBlank;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MovimientoCuentaDTO {
    @NotBlank(message = "La cuenta de origen no puede estar vacía")
    @Schema(description = "ID de la cuenta origen", example = "123456")
    private String cuentaOrigenId;

    @NotBlank(message = "La cuenta de destino no puede estar vacía")
    @Schema(description = "ID de la cuenta destino", example = "654321")
    private String cuentaDestinoId;
    
    @Schema(description = "Monto a transferir", example = "5000.0")
    private Double monto;
}
