package com.example.demo.Model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
public class Supplier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String companyName;
    private String representativeName;
    private String phone;
    private String password;
    @OneToMany(mappedBy="supplier")
    @JsonIgnore
    private List<Products> products;
    @OneToMany(mappedBy = "supplier")
    @JsonIgnore
    private List<Orders> orders;


    public Supplier() {
    }


    public Supplier(Long id, String companyName, String representativeName, String phone, String password, List<Products> products, List<Orders> orders) {
        this.id = id;
        this.companyName = companyName;
        this.representativeName = representativeName;
        this.phone = phone;
        this.password = password;
        this.products = products;
        this.orders = orders;
    }

    public List<Orders> getOrders() {
        return orders;
    }

    public void setOrders(List<Orders> orders) {
        this.orders = orders;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getRepresentativeName() {
        return representativeName;
    }

    public void setRepresentativeName(String representativeName) {
        this.representativeName = representativeName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Products> getProducts() {
        return products;
    }

    public void setProducts(List<Products> products) {
        this.products = products;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
