package com.banking.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.banking.models.documents.MovimientoCuenta;
import com.banking.models.dtos.MovimientoCuentaDTO;
import com.banking.models.responses.Response;
import com.banking.services.MovimientoCuentaService;

@RestController
@RequestMapping("/movimientos")
public class MovimientoCuentaController {

    @Autowired
    MovimientoCuentaService movimientoCuentaService;

@PostMapping
    public ResponseEntity<?> crearMovimiento(@RequestBody MovimientoCuentaDTO movimientoCuentaDTO){
    MovimientoCuenta movimientoCuenta = movimientoCuentaService.crearMovimiento(movimientoCuentaDTO);

    Response<MovimientoCuenta> response = Response.<MovimientoCuenta>builder()
        .status(201)
        .message("Transferencia realizada con exito")
        .data(movimientoCuenta)
        .build();

    return ResponseEntity.status(201).body(response);
    }


    @GetMapping ("/{id}")
    public ResponseEntity<?> obtenerMovimientos(@PathVariable String id){
        return ResponseEntity.ok(this.movimientoCuentaService.obtenerMovimientos(id));
    }

}
