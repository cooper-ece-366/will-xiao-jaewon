package edu.cooper.ece366.project.dove.server.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import edu.cooper.ece366.project.dove.server.model.Store;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Pageable;

//import java.awt.print.Pageable;
import java.util.List;
import java.util.Optional;

public interface StoreRepository extends JpaRepository<Store, Integer>{ // created by Will

    @Query("from Store s where s.name=:keyword OR s.address=:keyword OR s.info=:keyword OR s.type=:keyword OR s.id=:keyword")
    Page<Store> findAll(Pageable pageable, @Param("keyword") String keyword);

    @Query("FROM Store s WHERE st_distance_sphere(POINT(:lng,:lat), s.coords) < :distance ORDER BY st_distance_sphere(POINT(:lng,:lat), s.coords)")
    Page<Store> findDistance(Pageable pageable, @Param("distance") int distance, @Param("lat") String lat, @Param("lng") String lng);

//    Store findAllByName(String name);
//
//    List<Store> findByNameContaining(String name);
//
//    List<Store> findByDensityLessThan(Float density);
//
//    List<Store> findAll(Pageable pageable);
//
//
//    @Override
//    List<Store> findAll();


}
