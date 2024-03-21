package com.example.PFE.Back.Service.Implementation;

import com.example.PFE.Back.Model.CommandeLine;
import com.example.PFE.Back.Model.Dish;
import com.example.PFE.Back.Model.Order;
import com.example.PFE.Back.Repo.CommandeLineRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class CommandeLineService {

    @Autowired
    private CommandeLineRepo commandeLineRepository;

    @Autowired
    private DishService dishService;
    @Autowired
    private OrderService orderService;

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