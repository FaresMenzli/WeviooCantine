package com.example.PFE.Back.Service.Implementation;

import com.example.PFE.Back.Model.Dish;
import com.example.PFE.Back.Model.DishToSuggest;
import com.example.PFE.Back.Model.WeatherStatus;
import com.example.PFE.Back.Repo.DishRepo;
import com.example.PFE.Back.Repo.DishToSuggestRepo;
import com.sun.tools.javac.Main;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DishToSuggestService {

    @Autowired
    private DishToSuggestRepo dishToSuggestRepository;

    @Autowired
    private DishRepo dishRepo;

    public DishToSuggest saveDishToSuggest(DishToSuggest dishToSuggest) {
        return dishToSuggestRepository.save(dishToSuggest);
    }

    public List<DishToSuggest> getAllDishToSuggests() {
        return dishToSuggestRepository.findAll();
    }

    public DishToSuggest getDishToSuggestById(Long id) {
        return dishToSuggestRepository.findById(id).orElse(null);
    }

    public void deleteDishToSuggest(Long id) {
        dishToSuggestRepository.deleteById(id);
    }


    public List<Dish> getDishToSuggestsByWeatherStatus(WeatherStatus weatherStatus) {
        System.out.println("service");
        System.out.println(weatherStatus);
        Optional<DishToSuggest> optionalDishToSuggest = dishToSuggestRepository.findByWeatherStatus(weatherStatus);
        return optionalDishToSuggest.map(DishToSuggest::getDishesToSuggest).orElse(null);
    }

    public void updateDishsInDishToSuggest(WeatherStatus weatherStatus, List<String> dishToSuggestIds) {
        Optional<DishToSuggest> optionalDishToSuggest = dishToSuggestRepository.findByWeatherStatus(weatherStatus);
        if (optionalDishToSuggest.isPresent()) {
            DishToSuggest oldDishToSuggest = optionalDishToSuggest.get();
            List<Long> longList = dishToSuggestIds.stream()
                    .map(Long::valueOf).toList();
            oldDishToSuggest.setDishesToSuggest(dishRepo.findAllById(longList));
            System.out.println(oldDishToSuggest);
            dishToSuggestRepository.save(oldDishToSuggest);


        }
    }}
