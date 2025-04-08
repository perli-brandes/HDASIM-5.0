package com.example.demo.controller;


import com.example.demo.Model.Products;
import com.example.demo.Model.Supplier;
import com.example.demo.service.ProductsRepository;
import com.example.demo.service.SupplierRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RequestMapping("api/products")
@RestController
@CrossOrigin
public class ProductController {
    private final ProductsRepository productsRepository;
    private SupplierRepository supplierRepository;

    public ProductController(SupplierRepository supplierRepository, ProductsRepository productsRepository) {
        this.supplierRepository = supplierRepository;
        this.productsRepository = productsRepository;
    }


    @PostMapping("/addProduct")
    public ResponseEntity<Products> addProduct(@RequestBody Products product) {
        Supplier supProduct=supplierRepository.findById(product.getSupplier().getId()).orElse(null);

        if(supProduct==null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        product.setSupplier(supProduct);

        Products saved= productsRepository.save(product);
        return  ResponseEntity.status(201).body(saved);
    }



    @GetMapping("/getProducts")
    public ResponseEntity<List<Products>> getProducts(){
        List<Products> users = productsRepository.findAll();

        return ResponseEntity.ok(users);
    }

}
