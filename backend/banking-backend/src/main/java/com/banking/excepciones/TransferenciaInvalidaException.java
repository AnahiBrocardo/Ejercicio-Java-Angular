package com.banking.excepciones;

public class TransferenciaInvalidaException extends RuntimeException {
 public TransferenciaInvalidaException(String message){
        super(message);
    }
}
