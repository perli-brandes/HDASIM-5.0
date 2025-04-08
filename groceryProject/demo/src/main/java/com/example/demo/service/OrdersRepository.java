package com.example.demo.service;

import com.example.demo.Model.Orders;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrdersRepository extends JpaRepository<Orders, Long> {

    List<Orders> findBySupplierId(Long supplierId);
}
