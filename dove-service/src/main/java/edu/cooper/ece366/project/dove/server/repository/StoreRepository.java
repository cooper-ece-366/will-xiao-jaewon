package edu.cooper.ece366.project.dove.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import edu.cooper.ece366.project.dove.server.model.Store;

import java.util.List;
import java.util.Optional;

public interface StoreRepository extends JpaRepository<Store, Integer>{

    Store findById(long ID);

    Store findByName(String name);

    List<Store> findByNameContaining(String name);

    List<Store> findByDensityLessThan(Float density);

    @Override
    List<Store> findAll();
}
