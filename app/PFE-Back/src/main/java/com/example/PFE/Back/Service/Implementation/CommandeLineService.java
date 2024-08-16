package com.example.PFE.Back.Service.Implementation;

import com.example.PFE.Back.DTO.*;
import com.example.PFE.Back.Model.CommandeLine;
import com.example.PFE.Back.Model.Dish;
import com.example.PFE.Back.Model.Order;
import com.example.PFE.Back.Model.User;
import com.example.PFE.Back.Repo.CommandeLineRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class CommandeLineService {

    @Autowired
    private CommandeLineRepo commandeLineRepository;

    @Autowired
    private DishService dishService;
    @Autowired
    private OrderService orderService;
    @Autowired
    private ModelMapper modelMapper;

//    public List<DishSalesDTO> convertCommandeLineToDishSalesDTO(List<CommandeLineDTO> commandeLineDTOS) {
//        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
//        Map<Long, DishSalesDTO> dishSalesMap = new HashMap<>();
//        for (CommandeLineDTO commandLine : commandeLineDTOS) {
//            Long dishId = commandLine.getDish().getDishId();
//
//            String datePortion = dateFormat.format(commandLine.getCommandeLineDate());
//
//            String dishName = commandLine.getDish().getDishName();
//            if (dishSalesMap.containsKey(dishId)) {
//                DishSalesDTO dishSales = dishSalesMap.get(dishId);
//                dishSales.setQuantitySold(dishSales.getQuantitySold() + commandLine.getQuantity());
//
//            } else {
//                dishSalesMap.put(dishId, new DishSalesDTO(dishId, dishName, commandLine.getQuantity(), datePortion));
//            }
//        }
//        return new ArrayList<>(dishSalesMap.values());
//    }

public Sales getSalesInfo(Optional<Date> start, Optional<Date> end){

    List<DishSalesDetails> dishSalesDetailsList = getSalesDetails(start, end);
    double amount = dishSalesDetailsList.stream().mapToDouble(DishSalesDetails::getTotalAmountAllDays).sum();
    int Sale =dishSalesDetailsList.stream().mapToInt(DishSalesDetails::getTotalQuantitySoldAllDays).sum();


    return new Sales(amount,Sale, dishSalesDetailsList);

}

    public List<DishSalesDetails> getSalesDetails(Optional<Date> start, Optional<Date> end) {
        List<CommandeLineDTO> commandeLines ;
        if (start.isPresent() && end.isPresent()) {
            commandeLines=  commandelinesByDate( start.get() ,end.get());
        }

        else{ commandeLines = commandeLineDTOList();}
        return convertCommandeLinesDTOToDishSalesDetailsList(commandeLines);
//
//        Map<Long, Map<LocalDate, SaleDetails>> salesMap = new HashMap<>();
//        for (CommandeLineDTO commandLine : commandeLines) {
//            Long dishId = commandLine.getDish().getDishId();
//            String dishName = commandLine.getDish().getDishName();
//            LocalDate date = commandLine.getCommandeLineDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
//            double totalAmount = calculateTotalAmount(commandLine);
//            int quantitySold = commandLine.getQuantity();
//            SaleDetails saleDetails = new SaleDetails(date, quantitySold, totalAmount);
//            salesMap.computeIfAbsent(dishId, k -> new HashMap<>())
//                    .merge(date, saleDetails, (existingSale, newSale) -> {
//                        existingSale.setDayQuantitySold(existingSale.getDayQuantitySold() + newSale.getDayQuantitySold());
//                        existingSale.setDayTotalAmount(existingSale.getDayTotalAmount() + newSale.getDayTotalAmount());
//                        return existingSale;
//                    });
//
//
//        }
//        List<DishSalesDetails> result = new ArrayList<>();
//        for (Map.Entry<Long, Map<LocalDate, SaleDetails>> entry : salesMap.entrySet()) {
//            String dishName = commandeLines.stream()
//                    .filter(cmdLine -> cmdLine.getDish().getDishId().equals(entry.getKey()))
//                    .findFirst()
//                    .map(cmdLine -> cmdLine.getDish().getDishName())
//                    .orElse(null);
//            double totalAmountAllDays = entry.getValue().values().stream().mapToDouble(SaleDetails::getDayTotalAmount).sum();
//            int totalQuantitySoldAllDays = entry.getValue().values().stream().mapToInt(SaleDetails::getDayQuantitySold).sum();
//            DishSalesDetails dishSalesDetails = new DishSalesDetails(
//                    entry.getKey(),
//                    dishName,
//                    totalAmountAllDays,
//                    totalQuantitySoldAllDays,
//                    new ArrayList<>(entry.getValue().values())
//            );
//            result.add(dishSalesDetails);
//            dishSalesDetails.getSales().sort(Comparator.comparing(SaleDetails::getDate));
//
//        }
//
//        return result;
    }

    public List<DishSalesDetails> convertCommandeLinesDTOToDishSalesDetailsList (List<CommandeLineDTO> commandeLines ){

        Map<Long, Map<LocalDate, SaleDetails>> salesMap = new HashMap<>();
        for (CommandeLineDTO commandLine : commandeLines) {
            Long dishId = commandLine.getDish().getDishId();
            String dishName = commandLine.getDish().getDishName();
            LocalDate date = commandLine.getCommandeLineDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
            double totalAmount = calculateTotalAmount(commandLine);
            int quantitySold = commandLine.getQuantity();
            SaleDetails saleDetails = new SaleDetails(date, quantitySold, totalAmount);
            salesMap.computeIfAbsent(dishId, k -> new HashMap<>())
                    .merge(date, saleDetails, (existingSale, newSale) -> {
                        existingSale.setDayQuantitySold(existingSale.getDayQuantitySold() + newSale.getDayQuantitySold());
                        existingSale.setDayTotalAmount(existingSale.getDayTotalAmount() + newSale.getDayTotalAmount());
                        return existingSale;
                    });


        }
        List<DishSalesDetails> result = new ArrayList<>();
        for (Map.Entry<Long, Map<LocalDate, SaleDetails>> entry : salesMap.entrySet()) {
            String dishName = commandeLines.stream()
                    .filter(cmdLine -> cmdLine.getDish().getDishId().equals(entry.getKey()))
                    .findFirst()
                    .map(cmdLine -> cmdLine.getDish().getDishName())
                    .orElse(null);
            double totalAmountAllDays = entry.getValue().values().stream().mapToDouble(SaleDetails::getDayTotalAmount).sum();
            int totalQuantitySoldAllDays = entry.getValue().values().stream().mapToInt(SaleDetails::getDayQuantitySold).sum();
            DishSalesDetails dishSalesDetails = new DishSalesDetails(
                    entry.getKey(),
                    dishName,
                    totalAmountAllDays,
                    totalQuantitySoldAllDays,
                    new ArrayList<>(entry.getValue().values())
            );
            result.add(dishSalesDetails);
            dishSalesDetails.getSales().sort(Comparator.comparing(SaleDetails::getDate));

        }

        return result;
    }

    private double calculateTotalAmount(CommandeLineDTO commandLine) {
        return commandLine.getQuantity() * commandLine.getDish().getDishPrice();
    }
    public List<CommandeLineDTO> convertCommandeLinesToDto(List<CommandeLine> commandeLines) {
        return commandeLines.stream()
                .map(commandeLine -> modelMapper.map(commandeLine, CommandeLineDTO.class))
                .collect(Collectors.toList());
    }
    public List<CommandeLineDTO> commandeLineDTOList() {

        List<CommandeLine> commandeLines = commandeLineRepository.findAll();
        return commandeLines.stream()
                .map(commandeLine -> modelMapper.map(commandeLine, CommandeLineDTO.class))
                .collect(Collectors.toList());
    }

    public List<CommandeLineDTO> commandelinesByDate(Date startDate, Date endDate) {

        Calendar beginCalendar = Calendar.getInstance();
        beginCalendar.setTime(startDate);
        beginCalendar.set(Calendar.HOUR_OF_DAY, 0);
        beginCalendar.set(Calendar.MINUTE, 0);
        beginCalendar.set(Calendar.SECOND, 0);
        startDate = beginCalendar.getTime();
        Calendar endCalendar = Calendar.getInstance();
        endCalendar.set(Calendar.HOUR_OF_DAY, 23);
        endCalendar.set(Calendar.MINUTE, 59);
        endCalendar.set(Calendar.SECOND, 59);
        endDate = endCalendar.getTime();

        return  convertCommandeLinesToDto(commandeLineRepository.findByCommandeLineDateBetween(startDate, endDate));


    }


    public CommandeLine createCommandeLine(Long orderId, Long dishId, int quantity) {
        Optional<Order> orderOptional = orderService.getOrderById(orderId);
        Optional<Dish> dishOptional = dishService.getDishById(dishId);

        if (orderOptional.isPresent() && dishOptional.isPresent()) {
            Order order = orderOptional.get();
            Dish dish = dishOptional.get();

            CommandeLine newCommandeLine = new CommandeLine(new Date(), order, dish, quantity);
            return commandeLineRepository.save(newCommandeLine);
        } else {
            return null;
        }
    }

    public void updateCommandeLine(Long commandeLineId, CommandeLine updatedCommandeLine) {
        commandeLineRepository.findById(commandeLineId).ifPresent(commandeLine -> {
            commandeLine.setCommandeLineDate(updatedCommandeLine.getCommandeLineDate());
            commandeLine.setOrder(updatedCommandeLine.getOrder());
            commandeLine.setDish(updatedCommandeLine.getDish());
            commandeLine.setQuantityOrdered(updatedCommandeLine.getQuantityOrdered());
            commandeLineRepository.save(commandeLine);
        });
    }

    public void deleteCommandeLine(Long commandeLineId) {
        commandeLineRepository.deleteById(commandeLineId);
    }

}