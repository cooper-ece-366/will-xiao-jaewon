package edu.cooper.ece366.project.dove.server.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.cooper.ece366.project.dove.server.model.Store;
import edu.cooper.ece366.project.dove.server.repository.StoreRepository;
@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping(path="/api/store")
public class StoreController {
    @Autowired
    private StoreRepository storeRepository;
    @GetMapping("/all")
    public List<Store> getAllStores() {
        return storeRepository.findAll();
    }
}