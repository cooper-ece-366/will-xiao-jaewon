package edu.cooper.ece366.project.dove.server.services;
//
//
//import edu.cooper.ece366.project.dove.server.model.Store;
//import edu.cooper.ece366.project.dove.server.repository.StoreRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageRequest;
//
//public class Services {
//
//    @Autowired
//    private StoreRepository storeRepository;
//
//    public Page<Store> findStoresAsPages(int offset, int pageSize){
//        Page<Store> storePages = StoreRepository.findAllbyName(PageRequest.of(offset,pageSize));
//    }
//
//}
