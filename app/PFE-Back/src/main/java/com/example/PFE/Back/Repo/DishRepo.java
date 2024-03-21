package com.example.PFE.Back.Repo;

import com.example.PFE.Back.Model.Dish;
import org.springframework.data.repository.CrudRepository;

public interface DishRepo extends CrudRepository<Dish,Long> {
}
