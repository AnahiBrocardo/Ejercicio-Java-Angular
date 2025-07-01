package com.banking.services;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.banking.excepciones.RecursoNoEncontradoException;
import com.banking.excepciones.SaldoInvalidoException;
import com.banking.models.documents.CuentaBancaria;
import com.banking.models.dtos.CuentaBancariaDTO;
import com.banking.models.dtos.SaldoDTO;
import com.banking.repositories.CuentaBancariaRepository;

@Service
public class CuentaBancariaService {

    @Autowired
    CuentaBancariaRepository cuentaRepository;

    private static final Logger logger = LoggerFactory.getLogger(MovimientoCuentaService.class);

    public CuentaBancaria crearCuentaBancaria(CuentaBancariaDTO cuentaDTO) {
        logger.info("Creando cuenta bancaria para: {} {}", cuentaDTO.getNombre(), cuentaDTO.getApellido());
        CuentaBancaria cuenta = CuentaBancaria.builder()
                .nombre(cuentaDTO.getNombre())
                .apellido(cuentaDTO.getApellido())
                .activa(true)
                .saldo(0)
                .numeroCuenta(generarNumeroCuentaNumericoUnico())
                .build();
        CuentaBancaria cuentaGuardada = cuentaRepository.save(cuenta);
        logger.info("Cuenta creada con número: {}", cuentaGuardada.getNumeroCuenta());
        return cuentaGuardada;
    }

    public List<CuentaBancaria> obtenerCuentasActivas() {
        return cuentaRepository.findByActivaTrue();
    }

    @Cacheable(value = "saldoCuenta", key = "#id")
    public CuentaBancaria obtenerCuentaPorId(String id) {
        logger.info("Buscando cuenta por ID: {}", id);
        CuentaBancaria cuenta = cuentaRepository.findByIdAndActivaTrue(id);
        if (cuenta == null) {
            logger.warn("Cuenta bancaria con ID {} no encontrada o inactiva", id);
            throw new RecursoNoEncontradoException("La cuenta bancaria con ID " + id + " no existe o está inactiva");
        }
        return cuenta;
    }

    public CuentaBancaria eliminarCuenta(String id) {
         logger.info("Eliminando cuenta bancaria con ID: {}", id);
        CuentaBancaria cuenta = cuentaRepository.findByIdAndActivaTrue(id);
        if (cuenta == null) {
            logger.warn("Cuenta inexistente o inactiva con ID: {}", id);
            throw new RecursoNoEncontradoException("La cuenta bancaria con ID " + id + "no existe o está inactiva");
        }
        cuenta.setActiva(false);
         CuentaBancaria cuentaActualizada = cuentaRepository.save(cuenta);
        logger.info("Cuenta con ID {} desactivada correctamente", id);
        return cuentaActualizada;
    }

    public CuentaBancaria actualizarSaldo(SaldoDTO saldoDTO) {
        logger.info("Actualizando saldo de cuenta ID: {} a {}", saldoDTO.getCuentaId(), saldoDTO.getSaldo());
        CuentaBancaria cuenta = cuentaRepository.findByIdAndActivaTrue(saldoDTO.getCuentaId());
        if (cuenta == null) {
            logger.warn("Cuenta bancaria con ID {} no encontrada o inactiva para actualizar saldo", saldoDTO.getCuentaId());
            throw new RecursoNoEncontradoException(
                    "La cuenta bancaria con ID " + saldoDTO.getCuentaId() + "no existe o está inactiva");
        }
        verificarSaldoPositivo(saldoDTO.getSaldo());
        cuenta.setSaldo(saldoDTO.getSaldo());
        CuentaBancaria cuentaGuardada = cuentaRepository.save(cuenta);
        logger.info("Saldo actualizado para cuenta ID: {}", saldoDTO.getCuentaId());
        return cuentaGuardada;
    }

    private void verificarSaldoPositivo(double saldo){
     if(saldo<0){
         logger.warn("El saldo no puede ser negativo");
         throw new SaldoInvalidoException("El saldo no puede ser negativo");
     }
    }

    private String generarNumeroCuentaNumericoUnico() {
        String numeroCuenta;
        do {
            numeroCuenta = generarNumeroCuentaNumerico();
        } while (cuentaRepository.existsByNumeroCuenta(numeroCuenta));
        return numeroCuenta;
    }

    private String generarNumeroCuentaNumerico() {
        int length = 10;
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < length; i++) {
            int digito = (int) (Math.random() * 10);
            sb.append(digito);
        }
        return sb.toString();
    }
}
