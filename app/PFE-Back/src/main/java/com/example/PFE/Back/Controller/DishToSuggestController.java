package com.example.PFE.Back.Controller;


import com.example.PFE.Back.DTO.OrderRequestDTO;
import com.example.PFE.Back.Model.Dish;
import com.example.PFE.Back.Model.DishToSuggest;
import com.example.PFE.Back.Model.Order;
import com.example.PFE.Back.Model.WeatherStatus;
import com.example.PFE.Back.Service.Implementation.DishToSuggestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dishToSuggests")
public class DishToSuggestController {

    @Autowired
    private DishToSuggestService dishToSuggestService;

    @PostMapping
    public DishToSuggest createDishToSuggest(@RequestBody DishToSuggest dishToSuggest) {
        return dishToSuggestService.saveDishToSuggest(dishToSuggest);
    }

    @GetMapping
    public List<DishToSuggest> getAllDishToSuggests() {
        return dishToSuggestService.getAllDishToSuggests();
    }

    @GetMapping("/{id}")
    public DishToSuggest getDishToSuggestById(@PathVariable Long id) {
        return dishToSuggestService.getDishToSuggestById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteDishToSuggest(@PathVariable Long id) {
        dishToSuggestService.deleteDishToSuggest(id);
    }

    @GetMapping("/weather/{weatherStatus}")
    public List<Dish> getDishToSuggestsByWeatherStatus(@PathVariable WeatherStatus weatherStatus) {
        System.out.println("controller");
        return dishToSuggestService.getDishToSuggestsByWeatherStatus(weatherStatus);
    }

    @PutMapping("/updateSuggestion/{weatherStatus}")
    public ResponseEntity<DishToSuggest> updateDishToSuggest(
            @PathVariable WeatherStatus weatherStatus,
            @RequestBody List<String> dishToSuggest) {

            dishToSuggestService.updateDishsInDishToSuggest(weatherStatus , dishToSuggest);

        return new ResponseEntity<>(null , HttpStatus.CREATED);
    }
}