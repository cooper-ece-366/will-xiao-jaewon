package edu.cooper.ece366.project.dove.server.controller;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import edu.cooper.ece366.project.dove.server.services.storeService;
import edu.cooper.ece366.project.dove.server.model.NoSuchAddressException;
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
public class StoreController { // edited by Will, Jaewon
    @Autowired
    private StoreRepository storeRepository;

    @Autowired
    private storeService service;

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

    /** Add a store
     *
     * TODO: Take a look at:
     * https://www.toptal.com/java/spring-boot-rest-api-error-handling and
     * https://spring.io/blog/2013/11/01/exception-handling-in-spring-mvc
     */
    @PostMapping("/store")
    public ResponseEntity<Store> createStore(@RequestBody Store store){
        try {
            Store s = storeRepository.save(store.newWithCoords());
            return new ResponseEntity<Store>(s, HttpStatus.CREATED);
        // } catch (IOException e) {
        //     return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        // } catch (NoSuchAddressException e) {
        //     return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/store")
    public List<Store> getStore(){
        return service.getAllStore();
    }

    @GetMapping("/store/{id}")
    public ResponseEntity<Store> getStoreById(@PathVariable("id") Integer id){
        Optional<Store> s = service.getStoreById(id);
        if(s.isPresent()) {
            return new ResponseEntity<Store>(s.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/store/{id}")
    public ResponseEntity<Store> updateStore(@PathVariable("id") Integer id,@RequestBody Store store){
        try {
            Optional<Store> s = service.updateStore(id, store);
            if(s.isPresent()) {
                return new ResponseEntity<Store>(s.get(), HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        // } catch (IOException e) {
        //     return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        // } catch (NoSuchAddressException e) {
        //     return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
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