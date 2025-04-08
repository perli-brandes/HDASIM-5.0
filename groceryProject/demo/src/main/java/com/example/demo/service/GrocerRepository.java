package com.example.demo.service;

import com.example.demo.Model.Grocer;
import com.example.demo.Model.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GrocerRepository extends JpaRepository<Grocer, Long> {

    Grocer findByPhone(String phone);
}
