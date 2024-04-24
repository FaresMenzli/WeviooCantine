package com.example.PFE.Back.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class DishSalesDetails {
    private Long dishId;
    private String dishName;
    private double TotalAmountAllDays;
    private int TotalQuantitySoldAllDays;
    private List<SaleDetails> sales;
}