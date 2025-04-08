package com.example.demo.controller;


import com.example.demo.Model.Grocer;
import com.example.demo.service.GrocerRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("api/grocer")
@RestController
@CrossOrigin
public class GrocerController {


    private final GrocerRepository grocerRepository;

    public GrocerController(GrocerRepository grocerRepository) {
        this.grocerRepository = grocerRepository;
    }

    @PostMapping("/logInGrocer")
    public ResponseEntity<Grocer> logInGrocer(@RequestBody Grocer grocer) {
        Grocer existingG = grocerRepository.findByPhone(grocer.getPhone());
        if(existingG==null) {
            return ResponseEntity.status(404).body(null);
        }
        if(!grocer.getPassword().equals(existingG.getPassword())){
            return ResponseEntity.status(401).body(null);
        }

        return ResponseEntity.status(200).body(existingG);
    }


}
