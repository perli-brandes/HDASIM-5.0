package com.example.demo.controller;


import com.example.demo.Model.Orders;
import com.example.demo.Model.Products;
import com.example.demo.Model.Supplier;
import com.example.demo.service.OrdersRepository;
import com.example.demo.service.SupplierRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping("api/orders")
@RestController
@CrossOrigin
public class OrdersController {


    private final SupplierRepository supplierRepository;
    private final OrdersRepository ordersRepository;

    public OrdersController(SupplierRepository supplierRepository, OrdersRepository ordersRepository) {
        this.supplierRepository = supplierRepository;
        this.ordersRepository = ordersRepository;
    }

    @PostMapping("/addOrder")
    public ResponseEntity<Orders> addOrder(@RequestBody Orders order) {
        System.out.println(" in add orders order: "+order.getOrderDate());
        Supplier supProduct=supplierRepository.findById(order.getSupplier().getId()).orElse(null);
        System.out.println("supp name: "+supProduct.getRepresentativeName());
        if(supProduct==null) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        order.setSupplier(supProduct);

        Orders saved= ordersRepository.save(order);
        return  ResponseEntity.status(201).body(saved);
    }




    @PutMapping("/updateOrder/{id}")
    public ResponseEntity<Orders> updateOrder(@PathVariable Long id, @RequestBody Orders updatedOrder) {

        Orders existingOrder = ordersRepository.findById(id).orElse(null);
        if (existingOrder == null) {
            return ResponseEntity.status(404).body(null);
        }

        if(updatedOrder.getStatus()!=null){
            existingOrder.setStatus(updatedOrder.getStatus());
        }

        Orders savedOrder = ordersRepository.save(existingOrder);

        return ResponseEntity.ok(savedOrder);
    }

    @GetMapping("/getOrders")
    public ResponseEntity<List<Orders>> getOrders(){
        List<Orders> orders = ordersRepository.findAll();

        return ResponseEntity.ok(orders);

    }

    @GetMapping("/getOrdersBySup/{id}")
    public ResponseEntity<List<Orders>> getOrdersBySup(@PathVariable Long id) {
        List<Orders> orders = ordersRepository.findBySupplierId(id);

        return ResponseEntity.ok(orders);

    }
}
