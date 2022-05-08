package edu.cooper.ece366.project.dove.server.services;

import edu.cooper.ece366.project.dove.server.model.Store;

import java.util.List;
import java.util.Optional;


public interface storeService {
    public Store addStore(Store store);

    public List<Store> getAllStore();

    public Store updateStore(Store store);

    public void delete(Integer id);

    public Store getStoreById (Integer id);

}
