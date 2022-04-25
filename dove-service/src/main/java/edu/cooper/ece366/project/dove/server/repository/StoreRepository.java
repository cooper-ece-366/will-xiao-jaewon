package edu.cooper.ece366.project.dove.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import edu.cooper.ece366.project.dove.server.model.Store;
public interface StoreRepository extends JpaRepository<Store, Long>{
}
