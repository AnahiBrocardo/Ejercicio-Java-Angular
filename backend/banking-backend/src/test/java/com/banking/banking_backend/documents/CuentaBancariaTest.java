package com.banking.banking_backend.documents;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import com.banking.models.documents.CuentaBancaria;

@ExtendWith(MockitoExtension.class)
public class CuentaBancariaTest {
    @Test
    void testEqualsAndHashCode() {
        CuentaBancaria c1 = CuentaBancaria.builder()
                .id("1")
                .nombre("Juan")
                .apellido("Lopez")
                .saldo(1000)
                .activa(true)
                .build();

        CuentaBancaria c2 = CuentaBancaria.builder()
                .id("1")
                .nombre("Juan")
                .apellido("Lopez")
                .saldo(1000)
                .activa(true)
                .build();

        Assertions.assertEquals(c1, c2);
        Assertions.assertEquals(c1.hashCode(), c2.hashCode());
    }

    @Test
    void testToString() {
        CuentaBancaria cuenta = CuentaBancaria.builder()
                .id("123")
                .nombre("Lucia")
                .apellido("Perez")
                .saldo(2000)
                .activa(true)
                .build();

        String toStringResult = cuenta.toString();

        Assertions.assertTrue(toStringResult.contains("Lucia"));
        Assertions.assertTrue(toStringResult.contains("Perez"));
    }
}
