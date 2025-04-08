package com.example.demo.controller;


import com.example.demo.Model.Supplier;
import com.example.demo.service.SupplierRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

@RequestMapping("api/supplier")
@RestController
@CrossOrigin
public class SupplierController {

    private SupplierRepository supplierRepository;
    public SupplierController(SupplierRepository supplierRepository) {
        this.supplierRepository = supplierRepository;
    }

    @PostMapping("/add")
    public ResponseEntity<Supplier> signIn(@RequestBody Supplier supplier) {

        Supplier existingSup = supplierRepository.findByPhone(supplier.getPhone());
        if (existingSup != null) {

            return ResponseEntity.status(409).body(null);
        }

        Supplier saved= supplierRepository.save(supplier);
        return  ResponseEntity.status(201).body(saved);
    }

    @PostMapping("/logIn")
    public ResponseEntity<Supplier> logIn(@RequestBody Supplier supplier) {
        Supplier existingSup = supplierRepository.findByPhone(supplier.getPhone());
        if(existingSup==null) {
            return ResponseEntity.status(404).body(null);
        }

        if (!existingSup.getPassword().equals(supplier.getPassword())) {
            return ResponseEntity.status(401).body(null);
        }

        return ResponseEntity.status(200).body(existingSup);
    }




    @GetMapping("/getSuppliers")
    public ResponseEntity<List<Supplier>> getAllSuppliers(){
        List<Supplier> users = supplierRepository.findAll();

        return ResponseEntity.ok(users);

    }

    @GetMapping("/getSupById/{id}")
    public ResponseEntity<Optional<Supplier>> getSupById(@PathVariable Long id) {
        Optional<Supplier> supplier = supplierRepository.findById(id);
        if(supplier==null)
            return ResponseEntity.status(404).body(null);
        return ResponseEntity.ok(supplier);

    }


}



