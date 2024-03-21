package com.example.PFE.Back.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DishDTO {
    private Long id;
    private String name;
    private BigDecimal price;
}
