package com.banking.excepciones;

public class CuentaExistenteException extends RuntimeException{
    public CuentaExistenteException(String message){
        super(message);
    }

}
