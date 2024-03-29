package com.example.PFE.Back.Controller;

import com.example.PFE.Back.Model.Dish;
import com.example.PFE.Back.Model.DishCategory;
import com.example.PFE.Back.Service.Implementation.DishService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
@RequestMapping("/api/Dishs")
@RestController
public class DishController {

    @Autowired
    DishService dishService;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/dishs")
    public List<Dish> dishList(){
        return dishService.dishList();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping("dish/{id}")
    public Optional<Dish> getDish(@PathVariable Long id ){
        return dishService.getDishById(id);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @RequestMapping("dishsByIds/{ids}")
    public List<Dish> getDishesByIds(@PathVariable List<Long> ids ){
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

}}
