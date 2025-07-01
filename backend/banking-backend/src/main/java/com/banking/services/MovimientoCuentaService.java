package com.banking.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Service;
import com.banking.excepciones.RecursoNoEncontradoException;
import com.banking.excepciones.TransferenciaInvalidaException;
import com.banking.models.documents.CuentaBancaria;
import com.banking.models.documents.MovimientoCuenta;
import com.banking.models.dtos.MovimientoCuentaDTO;
import com.banking.models.dtos.MovimientoDTOResponse;
import com.banking.repositories.CuentaBancariaRepository;
import com.banking.repositories.MovimientoCuentaRepository;

@Service
public class MovimientoCuentaService {
  @Autowired
  MovimientoCuentaRepository movimientoCuentaRepository;

  @Autowired
  CuentaBancariaRepository cuentaBancariaRepository;

  private static final Logger logger = LoggerFactory.getLogger(MovimientoCuentaService.class);

  @CacheEvict(value = "saldoCuenta", key = "#movimientoCuentaDTO.cuentaOrigenId")
  public MovimientoCuenta crearMovimiento(MovimientoCuentaDTO movimientoCuentaDTO) {
    logger.info("Iniciando creación de movimiento entre cuenta {} y cuenta {} por monto ${}",
        movimientoCuentaDTO.getCuentaOrigenId(),
        movimientoCuentaDTO.getCuentaDestinoId(),
        movimientoCuentaDTO.getMonto());

    if (movimientoCuentaDTO.getCuentaDestinoId().equals(movimientoCuentaDTO.getCuentaOrigenId())) {
      logger.warn("Transferencia inválida: la cuenta origen y destino son la misma ({})",
          movimientoCuentaDTO.getCuentaOrigenId());
      throw new TransferenciaInvalidaException("La cuenta de origen y la cuenta de destino no pueden ser la misma.");
    }

    CuentaBancaria cuentaOrigen = verificarExitenciaCuenta(movimientoCuentaDTO.getCuentaOrigenId());
    CuentaBancaria cuentaDestino = verificarExitenciaCuenta(movimientoCuentaDTO.getCuentaDestinoId());

    verificarSaldo(cuentaOrigen, movimientoCuentaDTO.getMonto());

    logger.info("Saldo verificado");
    MovimientoCuenta movimientoCuenta = MovimientoCuenta.builder()
        .cuentaOrigenId(movimientoCuentaDTO.getCuentaOrigenId())
        .cuentaDestinoId(movimientoCuentaDTO.getCuentaDestinoId())
        .monto(movimientoCuentaDTO.getMonto())
        .fecha(LocalDateTime.now())
        .activa(true)
        .build();


    actualizarSaldos(cuentaOrigen, cuentaDestino, movimientoCuentaDTO.getMonto());
    MovimientoCuenta movimientoGuardado = movimientoCuentaRepository.save(movimientoCuenta);

    logger.info("Movimiento guardado exitosamente con ID {}", movimientoGuardado.getId());

    return movimientoGuardado;
  }

  public List<MovimientoDTOResponse> obtenerMovimientos(String idCuenta) {
    verificarExitenciaCuenta(idCuenta);

    List<MovimientoCuenta> movimientos = movimientoCuentaRepository
        .findByCuentaOrigenIdOrCuentaDestinoId(idCuenta, idCuenta);

    if (movimientos == null || movimientos.isEmpty()) {
      throw new RecursoNoEncontradoException("No se encontraron movimientos asociados a la cuenta ID " + idCuenta);
    }

    List<MovimientoDTOResponse> listaRespuesta = new ArrayList<>();

    for (MovimientoCuenta m : movimientos) {
      String idContraparte = idCuenta.equals(m.getCuentaOrigenId()) ? m.getCuentaDestinoId() : m.getCuentaOrigenId();

      Optional<CuentaBancaria> contraparteOpt = cuentaBancariaRepository.findById(idContraparte);

      String nombreCompletoContraparte = contraparteOpt
          .map(c -> c.getNombre() + " " + c.getApellido())
          .orElse("Cuenta desconocida");

      MovimientoDTOResponse dto = new MovimientoDTOResponse(
          idCuenta,
          nombreCompletoContraparte,
          m.getMonto(),
          m.getFecha());

      listaRespuesta.add(dto);
    }

    return listaRespuesta;
  }

  private void verificarSaldo(CuentaBancaria cuenta, double monto) {
    if (cuenta.getSaldo() < monto) {
      logger.warn("Saldo insuficiente. Saldo actual: {}, monto requerido: {}", cuenta.getSaldo(), monto);
      throw new TransferenciaInvalidaException("El saldo de la cuenta ID " + cuenta.getId() + " es insuficiente.");


    }
  }

  private CuentaBancaria verificarExitenciaCuenta(String idCuenta) {
    CuentaBancaria cuenta = cuentaBancariaRepository.findByIdAndActivaTrue(idCuenta);
    if (cuenta == null) {
      logger.warn("Cuenta no encontrada o inactiva, ID: {}", idCuenta);
      throw new RecursoNoEncontradoException("La cuenta con ID " + idCuenta + " no existe o está inactiva.");
    }
    return cuenta;
  }

  private void actualizarSaldos(CuentaBancaria origen, CuentaBancaria destino, double monto) {
    origen.setSaldo(origen.getSaldo() - monto);
    destino.setSaldo(destino.getSaldo() + monto);

    cuentaBancariaRepository.save(origen);
    cuentaBancariaRepository.save(destino);
  }
}
