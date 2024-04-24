package com.example.PFE.Back.Controller;

import com.example.PFE.Back.DTO.CommandeLineDTO;
import com.example.PFE.Back.DTO.DishSalesDTO;
import com.example.PFE.Back.DTO.DishSalesDetails;
import com.example.PFE.Back.DTO.Sales;
import com.example.PFE.Back.Model.Dish;
import com.example.PFE.Back.Service.Implementation.CommandeLineService;
import com.example.PFE.Back.Service.Implementation.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RequestMapping("/api/CommandLine")
@RestController
public class CommandeLineController {
    @Autowired
    private CommandeLineService commandeLineService;

    @GetMapping("/")
    public List<CommandeLineDTO> clsDTO() {
        return commandeLineService.commandeLineDTOList();
    }

//    @GetMapping("/dishSales")
//    public List<DishSalesDTO> getDishSales() {
//        return commandeLineService.soldDishes();
//    }
    @GetMapping("/getSalesDetails")
    public List<DishSalesDetails> getsolddetails(){
        Optional<Date> startDate = Optional.empty();
        Optional<Date> endDate = Optional.empty();

        return commandeLineService.getSalesDetails(startDate,endDate);
    }
//    @GetMapping("/getSalesDetailsByDate")
//    public List<DishSalesDetails>
//    getsolddetailsbyDate(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date start, @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date end) {
//
//        Optional<Date> startDateOptional = Optional.ofNullable(start);
//        Optional<Date> endDateOptional = Optional.ofNullable(end);
//
//
//        return commandeLineService.getSalesDetails(startDateOptional, endDateOptional);
//    }

    @GetMapping("/getSalesDetailsByDate")
    public Sales
    getSalesInfo(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date start, @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date end) {

        Optional<Date> startDateOptional = Optional.ofNullable(start);
        Optional<Date> endDateOptional = Optional.ofNullable(end);


        return commandeLineService.getSalesInfo(startDateOptional, endDateOptional);
    }
//    @GetMapping("/topDishes")
//    public List<DishSalesDTO> getTopDishes() {
//        return commandeLineService.getTopDishes();
//
//    }

//    @GetMapping("/getCommandeLinesByDate")
//    public List<DishSalesDTO>
//    clsDTObyDate(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date start, @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date end) {
//        return commandeLineService.getSoldDishesByDate(start, end);
//    }


}