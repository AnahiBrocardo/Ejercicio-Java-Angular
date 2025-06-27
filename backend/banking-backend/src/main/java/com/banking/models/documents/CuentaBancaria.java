package com.banking.models.documents;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "cuentasBancarias")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CuentaBancaria {

    @Id
    private String id;
    private double saldo;
    private boolean activa;

    private String nombre;
    private String apellido;
    private String numeroCuenta;

   
}
