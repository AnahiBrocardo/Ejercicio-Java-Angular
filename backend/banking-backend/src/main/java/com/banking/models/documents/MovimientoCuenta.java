package com.banking.models.documents;

import java.time.LocalDateTime;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "movimientosCuentas")
public class MovimientoCuenta {
    @Id
    private String id;

    private String cuentaOrigenId;
    private String cuentaDestinoId;
    private Double monto;
    private LocalDateTime fecha;
    private boolean activa;    
}
