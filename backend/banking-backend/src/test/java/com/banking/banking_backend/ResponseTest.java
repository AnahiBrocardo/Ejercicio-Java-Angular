package com.banking.banking_backend;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import com.banking.models.responses.Response;

@ExtendWith(MockitoExtension.class)

public class ResponseTest {
    @Test
    void testConstructorAndGetters() {
        Response<String> response = new Response<>(200, "OK", "Datos");

        assertEquals(200, response.getStatus());
        assertEquals("OK", response.getMessage());
        assertEquals("Datos", response.getData());
    }

    @Test
    void testSetters() {
        Response<Integer> response = new Response<>();
        response.setStatus(404);
        response.setMessage("Not Found");
        response.setData(123);

        assertEquals(404, response.getStatus());
        assertEquals("Not Found", response.getMessage());
        assertEquals(123, response.getData());
    }

    @Test
    void testBuilder() {
        Response<Double> response = Response.<Double>builder()
                .status(201)
                .message("Created")
                .data(99.99)
                .build();

        assertEquals(201, response.getStatus());
        assertEquals("Created", response.getMessage());
        assertEquals(99.99, response.getData());
    }
     @Test
    void testEqualsHashCodeToString() {
        Response<String> r1 = new Response<>(200, "OK", "Data");
        Response<String> r2 = new Response<>(200, "OK", "Data");
        Response<String> r3 = new Response<>(404, "Not Found", "Other Data");

        assertEquals(r1, r2);

        assertNotEquals(r1, r3);

        assertEquals(r1.hashCode(), r2.hashCode());

        String str = r1.toString();
        assertNotNull(str);
        assertFalse(str.isEmpty());

        assertTrue(str.contains("status"));
        assertTrue(str.contains("message"));
    }
}
