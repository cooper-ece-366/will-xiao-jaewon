package edu.cooper.ece366.project.dove.server.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import edu.cooper.ece366.project.dove.server.model.Store;
import edu.cooper.ece366.project.dove.server.repository.StoreRepository;
@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping(path="/store/")
public class StoreController { // edited by Will
    @Autowired
    private StoreRepository storeRepository;

//    @GetMapping("/all")
//    public List<Store> getAllStores() {
//        return storeRepository.findAll();
//    }

    @GetMapping("")
    public Page<Store> getAllStores(Pageable pageable) {
        return storeRepository.findAll(pageable);
    }

    @GetMapping("/{keyword}")
    public Page<Store> getAllStore(Pageable pageable, @PathVariable("keyword") String keyword){
        return storeRepository.findAll(pageable,keyword);
    }

//    public Page<Store>  getSortedStore(@RequestParam Optional<Integer> page, @RequestParam Optional<String> sortBy) {
//        return storeRepository.findAll(PageRequest.of(page.orElse(0),5, Sort.Direction.ASC, sortBy.orElse("id")));
//    }

}