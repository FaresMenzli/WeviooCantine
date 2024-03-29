package com.example.PFE.Back.Controller;

import com.example.PFE.Back.DTO.CommandeLineDTO;
import com.example.PFE.Back.DTO.DishSalesDTO;
import com.example.PFE.Back.Model.Dish;
import com.example.PFE.Back.Service.Implementation.CommandeLineService;
import com.example.PFE.Back.Service.Implementation.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/api/CommandLine")
@RestController
public class CommandeLineController {
    @Autowired
    private CommandeLineService commandeLineService;

    @GetMapping("/")
    public List<CommandeLineDTO> clsDTO() {
        return commandeLineService.commandeLineDTOList();
    }

    @GetMapping("/dishSales")
    public List<DishSalesDTO> getDishSales() {
        return commandeLineService.soldDishes();
    }
    @GetMapping("/topDishes")
    public List<DishSalesDTO> getTopDishes() {
        return commandeLineService.getTopDishes();



    }
}