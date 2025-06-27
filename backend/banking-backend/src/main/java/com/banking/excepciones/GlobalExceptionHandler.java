package com.banking.excepciones;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import com.mongodb.MongoException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(CuentaExistenteException.class)
    public ErrorResponse handleExistentAccount(CuentaExistenteException ex) {
        logger.warn("Cuenta ya existente: {}", ex.getMessage());
        return new ErrorResponse(ex, HttpStatus.BAD_REQUEST.value());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(TransferenciaInvalidaException.class)
    public ErrorResponse handleTransferenciaInvalida(TransferenciaInvalidaException ex) {
        logger.warn("Transferencia inválida: {}", ex.getMessage());
        return new ErrorResponse(ex, HttpStatus.BAD_REQUEST.value());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(SaldoInvalidoException.class)
    public ErrorResponse handleSaldoInvalido(SaldoInvalidoException ex) {
        logger.warn("Saldo inválido: {}", ex.getMessage());
        return new ErrorResponse(ex, HttpStatus.BAD_REQUEST.value());
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(MongoException.class)
    public ErrorResponse handleMongoError(MongoException ex) {
        logger.error("Error MongoDB: {}", ex.getMessage());

        return new ErrorResponse(ex.getClass().getSimpleName(),
                "Error en la base de datos",
                HttpStatus.INTERNAL_SERVER_ERROR.value());
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler({
            RecursoNoEncontradoException.class
    })
    public ErrorResponse notFound(Exception ex) {
        logger.warn("Recurso no encontrado: {}", ex.getMessage());
        return new ErrorResponse(ex, HttpStatus.NOT_FOUND.value());
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(Exception.class)
    public ErrorResponse exception(Exception ex) {
        ex.printStackTrace();
        return new ErrorResponse(ex, HttpStatus.INTERNAL_SERVER_ERROR.value());
    }

}
