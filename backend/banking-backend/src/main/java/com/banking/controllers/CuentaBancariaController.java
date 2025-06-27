package com.banking.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.banking.models.documents.CuentaBancaria;
import com.banking.models.dtos.CuentaBancariaDTO;
import com.banking.models.dtos.SaldoDTO;
import com.banking.models.responses.Response;
import com.banking.services.CuentaBancariaService;

@RestController
@RequestMapping("/accounts")
public class CuentaBancariaController {

    @Autowired
    private CuentaBancariaService cuentaService;

    @PostMapping
    public ResponseEntity<?> crearCuenta(@RequestBody CuentaBancariaDTO cuentaDTO){
    CuentaBancaria nuevaCuenta = cuentaService.crearCuentaBancaria(cuentaDTO);

    Response<CuentaBancaria> response = Response.<CuentaBancaria>builder()
        .status(201)
        .message("Cuenta bancaria creada correctamente")
        .data(nuevaCuenta)
        .build();

    return ResponseEntity.status(201).body(response);
    }

    @GetMapping
    public ResponseEntity<?> obtenerCuentas(){
        return ResponseEntity.ok(this.cuentaService.obtenerCuentasActivas());
    }

    @GetMapping ("/{id}")
    public ResponseEntity<?> obtenerCuenta(@PathVariable String id){
        return ResponseEntity.ok(this.cuentaService.obtenerCuentaPorId(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarCuenta(@PathVariable String id){
    Response<CuentaBancaria> response = Response.<CuentaBancaria>builder()
        .message("Cuenta bancaria eliminada correctamente")
        .data(cuentaService.eliminarCuenta(id))
        .build();

    return ResponseEntity.ok(response);
    }

    @PutMapping("/actualizar-saldo")
    public  ResponseEntity<Response<CuentaBancaria>> actualizarSaldo(@RequestBody SaldoDTO saldoDTO){
    Response<CuentaBancaria> response = Response.<CuentaBancaria>builder()
        .status(200)
        .message("Saldo actualizado correctamente")
        .data(cuentaService.actualizarSaldo(saldoDTO))
        .build();

    return ResponseEntity.ok(response);
    }
    
}
