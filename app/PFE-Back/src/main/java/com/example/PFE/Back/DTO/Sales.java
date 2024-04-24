package com.example.PFE.Back.DTO;


import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;
@Data
@AllArgsConstructor
public class Sales {
    private double totalPeriodAmount;
    private int totalPeriodQuantitySold;
    private List<DishSalesDetails> dishSalesDetailsList;
}
