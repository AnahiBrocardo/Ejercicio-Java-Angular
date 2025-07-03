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
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/accounts")
@Tag(name = "Cuentas Bancarias", description = "Gestion de cuentas bancarias")
public class CuentaBancariaController {

        @Autowired
        private CuentaBancariaService cuentaService;

        @PostMapping
        @Operation(summary = "Crear una nueva cuenta bancaria", description = "Crea una cuenta bancaria con los datos proporcionados")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Cuenta obtenida correctamente", content = @Content(mediaType = "application/json", schema = @Schema(implementation = CuentaBancaria.class))),
                        @ApiResponse(responseCode = "400", description = "Datos inválidos en la solicitud"),
                        @ApiResponse(responseCode = "500", description = "Error interno del servidor")
        })
        public ResponseEntity<?> crearCuenta(@RequestBody CuentaBancariaDTO cuentaDTO) {
                CuentaBancaria nuevaCuenta = cuentaService.crearCuentaBancaria(cuentaDTO);

                Response<CuentaBancaria> response = Response.<CuentaBancaria>builder()
                                .status(201)
                                .message("Cuenta bancaria creada correctamente")
                                .data(nuevaCuenta)
                                .build();

                return ResponseEntity.status(201).body(response);
        }

        @GetMapping
        @Operation(summary = "Obtener todas las cuentas bancarias activas", description = "Devuelve una lista de cuentas activas")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Cuentas obtenidas correctamente"),
                        @ApiResponse(responseCode = "500", description = "Error interno del servidor")
        })
        public ResponseEntity<?> obtenerCuentas() {
                return ResponseEntity.ok(this.cuentaService.obtenerCuentasActivas());
        }

        @GetMapping("/{id}")
        @Operation(summary = "Obtener cuenta bancaria por ID", description = "Devuelve la cuenta bancaria correspondiente al ID proporcionado")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", 
                        description = "Cuenta obtenida correctamente", 
                        content = @Content(mediaType = "application/json", 
                        schema = @Schema(implementation = CuentaBancaria.class))),
                        @ApiResponse(responseCode = "404", description = "Cuenta no encontrada"),
                        @ApiResponse(responseCode = "500", description = "Error interno del servidor")
        })
        public ResponseEntity<?> obtenerCuenta(@PathVariable String id) {
                return ResponseEntity.ok(this.cuentaService.obtenerCuentaPorId(id));
        }

        @DeleteMapping("/{id}")
        @Operation(summary = "Eliminar una cuenta bancaria", description = "Elimina la cuenta bancaria correspondiente al ID proporcionado")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Cuenta eliminada correctamente",
                        content = @Content(mediaType = "application/json", 
                        schema = @Schema(implementation = CuentaBancaria.class))),
                        @ApiResponse(responseCode = "404", description = "Cuenta no encontrada"),
                        @ApiResponse(responseCode = "500", description = "Error interno del servidor")
        })
        public ResponseEntity<?> eliminarCuenta(@PathVariable String id) {
                Response<CuentaBancaria> response = Response.<CuentaBancaria>builder()
                                .status(200)
                                .message("Cuenta bancaria eliminada correctamente")
                                .data(cuentaService.eliminarCuenta(id))
                                .build();

                return ResponseEntity.ok(response);
        }

        @PutMapping("/actualizar-saldo")
        @Operation(summary = "Actualizar saldo de una cuenta bancaria", description = "Actualiza el saldo de la cuenta con los datos proporcionados")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Saldo actualizado correctamente"),
                        @ApiResponse(responseCode = "400", description = "Datos inválidos en la solicitud"),
                        @ApiResponse(responseCode = "500", description = "Error interno del servidor")
        })
        public ResponseEntity<Response<CuentaBancaria>> actualizarSaldo(@RequestBody SaldoDTO saldoDTO) {
                Response<CuentaBancaria> response = Response.<CuentaBancaria>builder()
                                .status(200)
                                .message("Saldo actualizado correctamente")
                                .data(cuentaService.actualizarSaldo(saldoDTO))
                                .build();

                return ResponseEntity.ok(response);
        }

}
