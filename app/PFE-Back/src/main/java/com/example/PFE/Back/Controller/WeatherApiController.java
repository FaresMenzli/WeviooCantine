package com.example.PFE.Back.Controller;


import com.example.PFE.Back.DTO.ApiResponse;
import com.example.PFE.Back.DTO.WeatherDegreeAndIcon;
import com.example.PFE.Back.DTO.WeviooSuggestion;
import com.example.PFE.Back.Model.Dish;
import com.example.PFE.Back.Service.Implementation.ApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public class WeatherApiController {

    private final ApiService apiService;

    @Autowired
    public WeatherApiController(ApiService apiService) {
        this.apiService = apiService;
    }

    @GetMapping("/api/weather")
    public ApiResponse getApiData() {
        return apiService.getDataFromApi();
    }

    @GetMapping("/api/degree")
    public WeatherDegreeAndIcon getWeatherDegreeAndIcon(){

        return new WeatherDegreeAndIcon(apiService.getWeatherDegree(), apiService.getWeatherIcon() );
    }

    @GetMapping("/api/wevioosugg")
    public WeviooSuggestion wevioosugg(){

        return apiService.getSuggestion() ;
    }

}
