package com.example.PFE.Back.DTO;

import com.example.PFE.Back.Model.Dish;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;
import java.util.Optional;
@Data
@AllArgsConstructor
public class WeviooSuggestion {
    private String SuggestionMessage;
    private WeatherDegreeAndIcon weatherDegreeAndIcon;
   private List<Dish> SuggestionDishs;
}
