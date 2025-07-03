package com.banking.banking_backend.controllers;

import org.junit.jupiter.api.Test;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import org.mockito.Mockito;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import com.banking.config.SecurityConfig;
import org.springframework.http.MediaType;
import com.banking.controllers.MovimientoCuentaController;
import com.banking.models.documents.MovimientoCuenta;
import com.banking.services.MovimientoCuentaService;

@WebMvcTest(MovimientoCuentaController.class)
@Import(SecurityConfig.class)
public class MovimientoCuentaControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private MovimientoCuentaService movimientoCuentaService;

    @Test
    void testCrearMovimiento() throws Exception {

        MovimientoCuenta mockMovimiento = MovimientoCuenta.builder()
        .cuentaOrigenId("origen123")
        .cuentaDestinoId("destino456")
        .monto(1000.0)
        .activa(true)
        .build();


     Mockito.when(movimientoCuentaService.crearMovimiento(Mockito.any())).thenReturn(mockMovimiento);

    mockMvc.perform(post("/movimientos")
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\"cuentaOrigenId\":\"origen123\",\"cuentaDestinoId\":\"cuentaDestinoId\", \"monto\":\"1000.0\"}"))
        .andDo(print())
        .andExpect(status().isCreated())
        .andExpect(jsonPath("$.cuentaOrigenId").value("origen123"))
        .andExpect(jsonPath("$.cuentaDestinoId").value("destino456"))
        .andExpect(jsonPath("$.monto").value(1000.0))
        .andExpect(jsonPath("$.activa").value(true));
    }
}
