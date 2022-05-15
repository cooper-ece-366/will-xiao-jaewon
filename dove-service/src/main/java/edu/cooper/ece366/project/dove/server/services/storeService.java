package edu.cooper.ece366.project.dove.server.services;

import edu.cooper.ece366.project.dove.server.model.NoSuchAddressException;
import edu.cooper.ece366.project.dove.server.model.Store;

import java.io.IOException;
import java.util.List;
import java.util.Optional;


public interface storeService { // created by Will,
    public Store addStore(Store store);

    public List<Store> getAllStore();

    public Optional<Store> updateStore(Integer id, Store store) throws IOException, NoSuchAddressException;

    public void delete(Integer id);

    public Optional<Store> getStoreById (Integer id);

}
