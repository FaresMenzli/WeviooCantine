package com.example.PFE.Back.DTO;
import lombok.Data;
import java.util.List;

@Data
public class ApiResponse {
    private int count;
    private List<WeatherData> data;
}