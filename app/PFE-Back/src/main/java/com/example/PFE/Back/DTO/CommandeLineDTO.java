package com.example.PFE.Back.DTO;

import com.example.PFE.Back.Model.Dish;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommandeLineDTO {
    private Long id;
    private Date commandeLineDate;
    private int quantity;
    private Dish dish;

}
