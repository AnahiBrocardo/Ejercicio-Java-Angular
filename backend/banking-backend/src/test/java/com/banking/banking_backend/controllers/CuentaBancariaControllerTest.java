package com.banking.banking_backend.controllers;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import org.springframework.http.MediaType;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import com.banking.config.SecurityConfig;
import com.banking.controllers.CuentaBancariaController;
import com.banking.models.documents.CuentaBancaria;
import com.banking.models.dtos.SaldoDTO;
import com.banking.services.CuentaBancariaService;

@WebMvcTest(CuentaBancariaController.class)
@Import(SecurityConfig.class)
public class CuentaBancariaControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CuentaBancariaService cuentaService;

    @Test
    void testCrearCuenta() throws Exception {

        CuentaBancaria cuenta = CuentaBancaria.builder()
                .id("abc123")
                .nombre("Juan")
                .apellido("Perez")
                .numeroCuenta("1234567890")
                .activa(true)
                .saldo(0)
                .build();

        Mockito.when(cuentaService.crearCuentaBancaria(Mockito.any())).thenReturn(cuenta);

        this.mockMvc.perform(post("/accounts")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"nombre\":\"Juan\",\"apellido\":\"Perez\"}"))
                .andDo(print())
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.status").value(201))
                .andExpect(jsonPath("$.message").value("Cuenta bancaria creada correctamente"))
                .andExpect(jsonPath("$.data.id").value("abc123"))
                .andExpect(jsonPath("$.data.nombre").value("Juan"))
                .andExpect(jsonPath("$.data.apellido").value("Perez"))
                .andExpect(jsonPath("$.data.numeroCuenta").value("1234567890"))
                .andExpect(jsonPath("$.data.saldo").value(0))
                .andExpect(jsonPath("$.data.activa").value(true));
    }

    @Test
    void testObtenerCuentasBancarias() throws Exception {
        List<CuentaBancaria> cuentas = List.of(
                CuentaBancaria.builder().id("1").nombre("Ana").apellido("Lopez").build(),
                CuentaBancaria.builder().id("2").nombre("Luis").apellido("Martinez").build());

        Mockito.when(cuentaService.obtenerCuentasActivas()).thenReturn(cuentas);

        this.mockMvc.perform(get("/accounts"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value("1"))
                .andExpect(jsonPath("$[0].nombre").value("Ana"))
                .andExpect(jsonPath("$[1].id").value("2"))
                .andExpect(jsonPath("$[1].apellido").value("Martinez"));
    }

    @Test
    void testObtenerCuentaPorId() throws Exception {
        CuentaBancaria cuenta = CuentaBancaria.builder()
                .id("abc123")
                .nombre("Juan")
                .apellido("Perez")
                .build();

        Mockito.when(cuentaService.obtenerCuentaPorId("abc123")).thenReturn(cuenta);

        mockMvc.perform(get("/accounts/abc123"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("abc123"))
                .andExpect(jsonPath("$.nombre").value("Juan"))
                .andExpect(jsonPath("$.apellido").value("Perez"));
    }

    @Test
    void testEliminarCuenta() throws Exception {
        CuentaBancaria cuentaEliminada = CuentaBancaria.builder()
                .id("abc123")
                .nombre("Juan")
                .apellido("Perez")
                .build();

        Mockito.when(cuentaService.eliminarCuenta("abc123")).thenReturn(cuentaEliminada);

        mockMvc.perform(delete("/accounts/abc123"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Cuenta bancaria eliminada correctamente"))
                .andExpect(jsonPath("$.data.id").value("abc123"))
                .andExpect(jsonPath("$.data.nombre").value("Juan"));
    }

    @Test
    void testActualizarSaldo() throws Exception {
        SaldoDTO saldoDTO = new SaldoDTO();
        saldoDTO.setCuentaId("abc123");
        saldoDTO.setSaldo(5000.0);

        CuentaBancaria cuentaActualizada = CuentaBancaria.builder()
                .id("abc123")
                .saldo(5000.0)
                .build();

        Mockito.when(cuentaService.actualizarSaldo(Mockito.any(SaldoDTO.class))).thenReturn(cuentaActualizada);

        String jsonSaldoDTO = "{\"cuentaId\":\"abc123\",\"saldo\":5000}";

        mockMvc.perform(put("/accounts/actualizar-saldo")
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonSaldoDTO))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Saldo actualizado correctamente"))
                .andExpect(jsonPath("$.data.id").value("abc123"))
                .andExpect(jsonPath("$.data.saldo").value(5000));
    }

}
