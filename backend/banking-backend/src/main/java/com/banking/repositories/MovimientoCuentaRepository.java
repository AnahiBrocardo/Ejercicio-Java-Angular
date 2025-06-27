package com.banking.repositories;

import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.banking.models.documents.MovimientoCuenta;

@Repository
public interface MovimientoCuentaRepository  extends MongoRepository<MovimientoCuenta, String> {
  List<MovimientoCuenta> findByCuentaOrigenIdOrCuentaDestinoId(String cuentaOrigenId, String cuentaDestinoId);

}
