package edu.cooper.ece366.project.dove.server.services;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import edu.cooper.ece366.project.dove.server.model.NoSuchAddressException;
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
    public Optional<Store> updateStore(Integer id, Store store) throws IOException, NoSuchAddressException {
        Optional<Store> store2 = this.getStoreById(id);
        if (store2.isPresent()) {
            Store s = store2.get();
            s.setName(store.getName());
            s.setAddress(store.getAddress());
            s.setInfo(store.getInfo());
            s.setDensity(store.getDensity());
            s.setType(store.getType());
            s = s.newWithCoords();
            return Optional.of(storeRepository.save(s));
        } else {
            return Optional.empty();
        }
    }

    @Override
    public void delete(Integer id){
        storeRepository.deleteById(id);
    }

    @Override
    public Optional<Store> getStoreById (Integer id){
        return storeRepository.findById(id);
    }
}
