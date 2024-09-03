package com.example.PFE.Back.Service.Implementation;

import com.example.PFE.Back.DTO.ApiResponse;
import com.example.PFE.Back.DTO.WeatherData;
import com.example.PFE.Back.DTO.WeatherDegreeAndIcon;
import com.example.PFE.Back.DTO.WeviooSuggestion;
import com.example.PFE.Back.Model.Dish;
import com.example.PFE.Back.Model.WeatherStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ApiService {

    private final RestTemplate restTemplate;

    @Autowired
    public ApiService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Autowired
    private DishService dishService;
    @Autowired
    private DishToSuggestService dishToSuggestService;


    public ApiResponse getDataFromApi() {
        String apiUrl = "https://api.weatherbit.io/v2.0/current?lat=36.89951782793725&lon=10.190657031051124&key=c532aff557dd4b5597c072a2d67de2a3&include=minutely";
        try {

            System.out.println("+++++++++++++++++++++++++++++++");
            System.out.println(restTemplate.getForObject(apiUrl, ApiResponse.class).getData().toArray()[0]);
            return restTemplate.getForObject(apiUrl, ApiResponse.class);
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            e.printStackTrace();
            return null;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public double getWeatherDegree() {
        return ((WeatherData) Objects.requireNonNull(getDataFromApi()).getData().toArray()[0]).getApp_temp();
    }

    public String getWeatherIcon() {

        return ((WeatherData) Objects.requireNonNull(getDataFromApi()).getData().toArray()[0]).getWeather().getIcon();
    }

    public WeviooSuggestion getSuggestion() {
        List<Dish> dishSuggestion = new ArrayList<>();
        // double WeatherDegree = getWeatherDegree();
        double WeatherDegree = 80;
        if (WeatherDegree > 20) {

          dishSuggestion=  dishToSuggestService.getDishToSuggestsByWeatherStatus(WeatherStatus.HOT);
            return new WeviooSuggestion("It's hot outside, stay hydrated and cool. we suggest : ", new WeatherDegreeAndIcon(WeatherDegree, getWeatherIcon()), dishSuggestion);
        } else if (WeatherDegree < 10) {

            return new WeviooSuggestion("It's cold outside, stay warm and cozy. We suggest: ", new WeatherDegreeAndIcon(WeatherDegree, getWeatherIcon()), dishSuggestion);

        }


        return new WeviooSuggestion("", new WeatherDegreeAndIcon(WeatherDegree, getWeatherIcon()), dishSuggestion);

    }
}
