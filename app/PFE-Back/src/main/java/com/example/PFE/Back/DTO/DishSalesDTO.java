package com.example.PFE.Back.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class DishSalesDTO {
    private Long dishId;
    private String dishName;
    private int quantitySold;
    private String dishSaleDate;
}