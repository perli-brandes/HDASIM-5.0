package com.example.demo.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
public class Orders {

    public  enum Status{
        order,processing,completed
    }


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Status status;
    private LocalDateTime orderDate;
    @OneToMany(mappedBy="order")
    @JsonIgnore
    private List<OrderItem> OrderItem;
    @ManyToOne

    private Supplier supplier;


    public Orders() {
    }

    public Orders(Long id, Status status, LocalDateTime orderDate, List<com.example.demo.Model.OrderItem> orderItem, Supplier supplier) {
        this.id = id;
        this.status = status;
        this.orderDate = orderDate;
        OrderItem = orderItem;
        this.supplier = supplier;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public LocalDateTime getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(LocalDateTime orderDate) {
        this.orderDate = orderDate;
    }

    public List<com.example.demo.Model.OrderItem> getOrderItem() {
        return OrderItem;
    }

    public void setOrderItem(List<com.example.demo.Model.OrderItem> orderItem) {
        OrderItem = orderItem;
    }

    public Supplier getSupplier() {
        return supplier;
    }

    public void setSupplier(Supplier supplier) {
        this.supplier = supplier;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
