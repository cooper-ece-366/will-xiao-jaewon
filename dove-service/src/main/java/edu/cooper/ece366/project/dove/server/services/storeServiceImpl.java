package edu.cooper.ece366.project.dove.server.services;

import java.util.List;
import java.util.Optional;

import edu.cooper.ece366.project.dove.server.model.Store;
import edu.cooper.ece366.project.dove.server.repository.StoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class storeServiceImpl implements storeService{

    @Autowired
    private StoreRepository storeRepository;

    @Override
    public Store addStore(Store store){
        return storeRepository.save(store);
    }

    @Override
    public List<Store> getAllStore() {
        return storeRepository.findAll();
    }

    @Override
    public Store updateStore(Store store) {
        Store store2 = storeRepository.findById(store.getId()).get();
        if (store2 != null) {
            store2.setName(store.getName());
            store2.setAddress(store.getAddress());
            store2.setInfo(store.getInfo());
            store2.setDensity(store.getDensity());
            store2.setType(store.getType());
            storeRepository.save(store2);
        }
        return store2;
    }

    @Override
    public void delete(Integer id){
        storeRepository.deleteById(id);
    }

    @Override
    public Store getStoreById (Integer id){
        return storeRepository.findById(id).get();
    }
}
