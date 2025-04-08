package com.example.demo.service;

import com.example.demo.Model.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SupplierRepository extends JpaRepository<Supplier, Long> {

    Supplier findByPhone(String phone);
}
