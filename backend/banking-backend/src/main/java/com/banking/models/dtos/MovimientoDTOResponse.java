package com.banking.models.dtos;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class MovimientoDTOResponse {
    private String cuentaID;
    private String nombreCompletoContraparte;
    private Double monto;
    private LocalDateTime fecha;
}
