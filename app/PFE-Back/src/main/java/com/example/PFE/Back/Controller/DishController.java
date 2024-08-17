package com.example.PFE.Back.Controller;

import com.example.PFE.Back.Model.Dish;
import com.example.PFE.Back.Model.DishCategory;
import com.example.PFE.Back.Model.UserRole;
import com.example.PFE.Back.Service.Implementation.DishService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@RequestMapping("/api/Dishs")
@RestController
public class DishController {

    @Autowired
    DishService dishService;

    @GetMapping("/dishs")
    public List<Dish> dishList() {
        return dishService.dishList();
    }

    @RequestMapping("dish/{id}")
    public Optional<Dish> getDish(@PathVariable Long id) {
        return dishService.getDishById(id);
    }

    @RequestMapping("dishsByIds/{ids}")
    public List<Dish> getDishesByIds(@PathVariable List<Long> ids) {
        return dishService.getDishsByIds(ids);
    }

    @PostMapping("/add")
    public ResponseEntity<Dish> addDish(@RequestBody Dish dish) {

        Dish savedDish = dishService.addDish(dish);

        return new ResponseEntity<>(savedDish, HttpStatus.CREATED);
    }

    @PostMapping("/addCategory")
    public ResponseEntity<String> addCategory(@RequestBody String newCategoryName) {
        try {
            DishCategory newCategory = DishCategory.valueOf(newCategoryName.toUpperCase());
            // Check if the category already exists
            if (Arrays.asList(DishCategory.values()).contains(newCategory)) {
                return ResponseEntity.badRequest().body("Category already exists: " + newCategoryName);
            }

            // Add the new category to the enum
            // Note: Modifying an enum at runtime is not recommended. This is just an example.
            // In a real-world scenario, you might consider storing categories in a database.
            DishCategory.values(); // This line is enough to load the enum class
            Field valuesField = DishCategory.class.getDeclaredField("$VALUES");
            valuesField.setAccessible(true);
            DishCategory[] newValues = Arrays.copyOf(DishCategory.values(), DishCategory.values().length + 1);
            newValues[newValues.length - 1] = newCategory;
            valuesField.set(null, newValues);

            return ResponseEntity.ok("Category added successfully: " + newCategoryName);
        } catch (IllegalArgumentException | NoSuchFieldException | IllegalAccessException e) {
            return ResponseEntity.badRequest().body("Invalid category: " + newCategoryName);
        }

    }

    @GetMapping("/categories")
    public DishCategory[] getAllRoles() {
        return DishCategory.values();
    }

    @PutMapping("updateDish/{dishId}")
    public ResponseEntity<Dish> updateDish(
            @PathVariable Long dishId,
            @RequestBody Dish dishDetails) {

        Optional<Dish> optionalUser = dishService.getDishById(dishId);
        if (optionalUser.isPresent()) {
            Dish updatedDish = dishService.updateDish(dishId, dishDetails);
            return ResponseEntity.ok(updatedDish);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


//    @CrossOrigin(origins = "http://localhost:3000")
//    @PutMapping("/updateDishQuantity/{dishId}")
//    public ResponseEntity<Long> updateDishQuantity(@PathVariable Long dishId, @RequestBody Integer newQuantity) {
//
//        dishService.updateDishQuantity(dishId, newQuantity);
//
//        return new ResponseEntity<>(dishId, HttpStatus.OK);
//    }
}
