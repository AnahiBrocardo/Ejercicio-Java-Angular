package com.banking.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.banking.models.documents.CuentaBancaria;
import com.banking.models.documents.MovimientoCuenta;
import com.banking.models.dtos.MovimientoCuentaDTO;
import com.banking.services.MovimientoCuentaService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/movimientos")
@Tag(name = "Movimientos", description = "Movimientos entre cuentas bancarias")
public class MovimientoCuentaController {

  @Autowired
  MovimientoCuentaService movimientoCuentaService;

  @PostMapping
  @Operation(summary = "Crear un nuevo movimiento", description = "Crea una transferencia entre cuentas bancarias")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "201", 
      description = "Movimiento creado exitosamente", 
      content = @Content(mediaType = "application/json", 
      schema = @Schema(implementation = MovimientoCuenta.class))),
      @ApiResponse(responseCode = "400", description = "Datos de entrada inválidos"),
      @ApiResponse(responseCode = "500", description = "Error interno del servidor")
  })
  public ResponseEntity<?> crearMovimiento(@RequestBody MovimientoCuentaDTO movimientoCuentaDTO) {
    MovimientoCuenta movimientoCreado = this.movimientoCuentaService.crearMovimiento(movimientoCuentaDTO);
    return ResponseEntity.status(HttpStatus.CREATED).body(movimientoCreado);
  }

  @GetMapping("/{id}")
  @Operation(summary = "Obtener movimientos por cuenta", description = "Devuelve todos los movimientos asociados a una cuenta bancaria")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Movimientos obtenidos exitosamente"),
      @ApiResponse(responseCode = "404", description = "Cuenta no encontrada"),
      @ApiResponse(responseCode = "500", description = "Error interno del servidor")
  })
  public ResponseEntity<?> obtenerMovimientos(@PathVariable String id) {
    return ResponseEntity.ok(this.movimientoCuentaService.obtenerMovimientos(id));
  }

}
