package com.example.PFE.Back.Service.Implementation;

import com.example.PFE.Back.DTO.CommandeLineDTO;
import com.example.PFE.Back.DTO.DishSalesDTO;
import com.example.PFE.Back.DTO.UserDTO;
import com.example.PFE.Back.Model.CommandeLine;
import com.example.PFE.Back.Model.Dish;
import com.example.PFE.Back.Model.Order;
import com.example.PFE.Back.Model.User;
import com.example.PFE.Back.Repo.CommandeLineRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

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

    public List<DishSalesDTO> soldDishes() {

        List<CommandeLineDTO> commandeLines = commandeLineDTOList();
        Map<Long, DishSalesDTO> dishSalesMap = new HashMap<>();
        for (CommandeLineDTO commandLine : commandeLines) {
            Long dishId = commandLine.getDish().getDishId();
            String dishName = commandLine.getDish().getDishName();
            if (dishSalesMap.containsKey(dishId)) {
                DishSalesDTO dishSales = dishSalesMap.get(dishId);
                dishSales.setQuantitySold(dishSales.getQuantitySold() + commandLine.getQuantity());
            } else {
                dishSalesMap.put(dishId, new DishSalesDTO(dishId, dishName, commandLine.getQuantity()));
            }
        }
        return new ArrayList<>(dishSalesMap.values());
    }
    public List<DishSalesDTO> getTopDishes() {
        List<DishSalesDTO> DishToSort =soldDishes();
        DishToSort.sort((a, b) -> b.getQuantitySold() - a.getQuantitySold());
        return DishToSort.subList(0, Math.min(DishToSort.size(), 3));

    }
        public List<CommandeLineDTO> commandeLineDTOList() {

        List<CommandeLine> commandeLines = commandeLineRepository.findAll();
        return commandeLines.stream()
                .map(commandeLine -> modelMapper.map(commandeLine, CommandeLineDTO.class))
                .collect(Collectors.toList());
    }

    public List<CommandeLine> getAllCommandeLines() {
        return (List<CommandeLine>) commandeLineRepository.findAll();
    }

    public Optional<CommandeLine> getCommandeLineById(Long commandeLineId) {
        return commandeLineRepository.findById(commandeLineId);
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
            // Handle the case where order or dish is not found
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