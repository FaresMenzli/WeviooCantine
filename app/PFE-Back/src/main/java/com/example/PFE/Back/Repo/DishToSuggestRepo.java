package com.example.PFE.Back.Repo;

import com.example.PFE.Back.Model.DishToSuggest;
import com.example.PFE.Back.Model.WeatherStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DishToSuggestRepo extends JpaRepository<com.example.PFE.Back.Model.DishToSuggest , Long> {

    Optional<DishToSuggest> findByWeatherStatus(WeatherStatus weatherStatus);
}
