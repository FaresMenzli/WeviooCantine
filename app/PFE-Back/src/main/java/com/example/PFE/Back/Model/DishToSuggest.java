package com.example.PFE.Back.Model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class DishToSuggest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long dishToRecommendId ;
    @ManyToMany
    @JoinTable(
            name = "dish_suggestion",
            joinColumns = @JoinColumn(name = "suggestion_id"),
            inverseJoinColumns = @JoinColumn(name = "dish_id"))
    private List<Dish> dishesToSuggest;
    @Enumerated(EnumType.STRING)
    private WeatherStatus weatherStatus;


}
