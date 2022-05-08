package edu.cooper.ece366.project.dove.server.controller;

import java.util.List;
import java.util.Optional;

import edu.cooper.ece366.project.dove.server.services.storeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import edu.cooper.ece366.project.dove.server.model.Store;
import edu.cooper.ece366.project.dove.server.repository.StoreRepository;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping(path="/store")
public class StoreController { // edited by Will
    @Autowired
    private StoreRepository storeRepository;

    @Autowired
    private storeService service;

//    @GetMapping("/all")
//    public List<Store> getAllStores() {
//        return storeRepository.findAll();
//    }

    @GetMapping("/")
    public Page<Store> getAllStores(Pageable pageable) {
        return storeRepository.findAll(pageable);
    }

    @GetMapping("/{keyword}")
    public Page<Store> getAllStore(Pageable pageable, @PathVariable("keyword") String keyword){
        return storeRepository.findAll(pageable,keyword);
    }

    @PostMapping("/store")
    public ResponseEntity<Store> createStore(@RequestBody Store store){
        return new ResponseEntity<Store>(service.addStore(store), HttpStatus.OK);
    }

    @GetMapping("/store")
    public List<Store> getStore(){
        return service.getAllStore();
    }

    @GetMapping("/store/{id}")
    public ResponseEntity<Store> getStoreById(@PathVariable("id") Integer id){
        return new ResponseEntity<Store>(service.getStoreById(id),HttpStatus.OK);
    }
    @PutMapping("/store/{id}")
    public ResponseEntity<Store> updateStore(@PathVariable("id") Integer id,@RequestBody Store store){
        return new ResponseEntity<Store>(service.updateStore(store),HttpStatus.OK);
    }
    @DeleteMapping("/store/{id}")
    public ResponseEntity<Store> deleteStore(@PathVariable ("id") Integer id){
        service.delete(id);
        return new ResponseEntity<Store>(HttpStatus.OK);
    }

//    public Page<Store>  getSortedStore(@RequestParam Optional<Integer> page, @RequestParam Optional<String> sortBy) {
//        return storeRepository.findAll(PageRequest.of(page.orElse(0),5, Sort.Direction.ASC, sortBy.orElse("id")));
//    }

}