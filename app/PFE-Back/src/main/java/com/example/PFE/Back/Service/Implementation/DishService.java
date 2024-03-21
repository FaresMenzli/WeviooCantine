package com.example.PFE.Back.Service.Implementation;

import com.example.PFE.Back.Exceptions.DishNotFoundException;
import com.example.PFE.Back.Model.Dish;
import com.example.PFE.Back.Model.DishCategory;
import com.example.PFE.Back.Repo.DishRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DishService {
    @Autowired
    private DishRepo dishRepo;
    public List<Dish> dishList(){
        return (List<Dish>) dishRepo.findAll();
    }
    public Optional<Dish> getDishById(Long id){
        return dishRepo.findById(id);


    }


    public List<Dish> getDishsByIds(List<Long> dishIds) {
        List<Dish> dishes = new ArrayList<>();
        for (Long dishId : dishIds) {
            Optional<Dish> dishById = getDishById(dishId);
            if (dishById.isPresent()) {
                Dish dish = dishById.get();
                dishes.add(dish);
            }
        }
        if (dishes.isEmpty()) {
            throw new DishNotFoundException("No dishes found for the provided IDs");
        }
        return dishes;
    }
    public Dish addDish(Dish dish) {
        return dishRepo.save(dish);
    }
}
