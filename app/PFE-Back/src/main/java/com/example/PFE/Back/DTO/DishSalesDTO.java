package com.example.PFE.Back.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DishSalesDTO {
    private Long dishId;
    private String dishName;
    private int quantitySold;
}