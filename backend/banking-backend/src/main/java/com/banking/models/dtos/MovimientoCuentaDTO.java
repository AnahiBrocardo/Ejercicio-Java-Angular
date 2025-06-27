package com.banking.models.dtos;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MovimientoCuentaDTO {
    private String cuentaOrigenId;
    private String cuentaDestinoId;
    private Double monto;
    private LocalDateTime fecha;
    private boolean activa;   
}
