package com.banking.excepciones;

public class SaldoInvalidoException extends RuntimeException{
public SaldoInvalidoException(String message){
        super(message);
    }
}
