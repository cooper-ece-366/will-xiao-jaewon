package edu.cooper.ece366.project.dove.server.controller;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import edu.cooper.ece366.project.dove.server.model.NoSuchAddressException;
import edu.cooper.ece366.project.dove.server.model.StoreDto;
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

    /** Get all stores (paged) **/
    @GetMapping("")
    public Page<Store> getAllStores(
            Pageable pageable,
            @RequestParam("search") Optional<String> search,
            @RequestParam("distance") Optional<Integer> distance,
            @RequestParam("from") Optional<String> from
            ) {
        if(search.isPresent()) {
            return storeRepository.findAll(pageable, search.get());
        } else if(distance.isPresent() && from.isPresent()) {
            System.out.println(String.format("Looking for places within %d meters away from %s", distance.get(), from.get()));
            String[] coords = from.get().split(","); // TODO: Input validation
            return storeRepository.findDistance(pageable, distance.get(), coords[0], coords[1]);
        } else {
            return storeRepository.findAll(pageable);
        }
    }

    /** Get a store by id */
    @GetMapping(value = "/{id}", produces = "application/json")
    public ResponseEntity<Store> getStoreById(@PathVariable int id) {
        Optional<Store> s = storeRepository.findById(id);
        if(s.isPresent()) {
            return new ResponseEntity<Store>(s.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    /** Add a store
     *
     * TODO: Take a look at:
     * https://www.toptal.com/java/spring-boot-rest-api-error-handling and
     * https://spring.io/blog/2013/11/01/exception-handling-in-spring-mvc
     */
    @PostMapping(value="", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Store> addStore(@RequestBody StoreDto store) {
        try {
            Store s = storeRepository.save(store.toModel());
            return new ResponseEntity<Store>(s, HttpStatus.CREATED);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (NoSuchAddressException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}