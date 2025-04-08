package com.example.demo.controller;


import com.example.demo.Model.OrderItem;
import com.example.demo.Model.Orders;
import com.example.demo.Model.Products;
import com.example.demo.service.OrderItemRepository;
import com.example.demo.service.OrdersRepository;
import com.example.demo.service.ProductsRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("api/orderItem")
@RestController
@CrossOrigin
public class OrderItemController {


    private final ProductsRepository productsRepository;
    private final OrdersRepository ordersRepository;
    private final OrderItemRepository orderItemRepository;

    public OrderItemController(ProductsRepository productsRepository, OrdersRepository ordersRepository, OrderItemRepository orderItemRepository) {
        this.productsRepository = productsRepository;
        this.ordersRepository = ordersRepository;
        this.orderItemRepository = orderItemRepository;
    }

    @PostMapping("/addOrderItem")
    public ResponseEntity<OrderItem> addOrderItem(@RequestBody OrderItem item) {
        Products product = productsRepository.findById(item.getProduct().getId()).orElse(null);
        if(product==null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        item.setProduct(product);

        Orders order = ordersRepository.findById(item.getOrder().getId()).orElse(null);
        if(order==null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        item.setOrder(order);


        OrderItem saved= orderItemRepository.save(item);
        return  ResponseEntity.status(201).body(saved);
    }



    @GetMapping("/getOrdersItem")
    public ResponseEntity<List<OrderItem>> getOrdersItem(){
        List<OrderItem> orderItems = orderItemRepository.findAll();

        return ResponseEntity.ok(orderItems);

    }

    @GetMapping("/getOrdersItemByOrder/{id}")
    public ResponseEntity<List<OrderItem>> getOrdersItemByOrder(@PathVariable Long id) {
        List<OrderItem> orderItems = orderItemRepository.findByOrderId(id);

        return ResponseEntity.ok(orderItems);

    }
}
