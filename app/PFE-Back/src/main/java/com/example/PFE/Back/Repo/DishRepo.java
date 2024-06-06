package com.example.PFE.Back.Repo;

import com.example.PFE.Back.Model.Dish;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface DishRepo extends JpaRepository<Dish,Long> {
    @Query(value = "SELECT * FROM dish ORDER BY RAND() LIMIT 5", nativeQuery = true)
    List<Dish> findRandomEntities();


}
