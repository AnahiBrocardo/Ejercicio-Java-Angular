package com.banking.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.banking.models.documents.CuentaBancaria;

@Repository
public interface CuentaBancariaRepository extends MongoRepository<CuentaBancaria, String> {
 List<CuentaBancaria> findByActivaTrue();
 CuentaBancaria  findByIdAndActivaTrue(String id);
 boolean existsByNumeroCuenta(String numeroCuenta);
}
