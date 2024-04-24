package com.example.PFE.Back.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.time.LocalDate;


@Data
@AllArgsConstructor
public class SaleDetails {
    private LocalDate date;
    private int dayQuantitySold;
    private double dayTotalAmount;
}