package com.example.PFE.Back.Service.Implementation;

import java.util.Calendar;
import java.util.logging.Logger;

import com.example.PFE.Back.DTO.CommandeLineDTO;
import com.example.PFE.Back.DTO.CommandeLineRequestDTO;
import com.example.PFE.Back.DTO.OrderDTO;
import com.example.PFE.Back.DTO.OrderRequestDTO;
import com.example.PFE.Back.Exceptions.DishNotFoundException;
import com.example.PFE.Back.Exceptions.UserNotFoundException;
import com.example.PFE.Back.Model.CommandeLine;
import com.example.PFE.Back.Model.Dish;
import com.example.PFE.Back.Model.Order;
import com.example.PFE.Back.Model.User;
import com.example.PFE.Back.Repo.CommandeLineRepo;
import com.example.PFE.Back.Repo.DishRepo;
import com.example.PFE.Back.Repo.OrderRepo;
import com.example.PFE.Back.Repo.UserRepo;
import org.aspectj.bridge.MessageUtil;
import org.aspectj.weaver.ast.Or;
import org.modelmapper.ModelMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
public class OrderService {
    @Autowired
    private OrderRepo orderRepository;

    @Autowired
    private DishService dishService;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    DishRepo dishRepo;
    @Autowired
    CommandeLineRepo commandeLineRepo;
    @Autowired
    private ModelMapper modelMapper;

    public List<Order> getOrdersByDate(Date date) {
        // Set time to start of the day
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        calendar.set(Calendar.HOUR_OF_DAY, 0);
        calendar.set(Calendar.MINUTE, 0);
        calendar.set(Calendar.SECOND, 0);
        Date startDate = calendar.getTime();

        // Set time to end of the day
        calendar.set(Calendar.HOUR_OF_DAY, 23);
        calendar.set(Calendar.MINUTE, 59);
        calendar.set(Calendar.SECOND, 59);
        Date endDate = calendar.getTime();

        return orderRepository.findByOrderDateBetween(startDate, endDate);
    }

    public List<Order> getAllOrders() {
        return (List<Order>) orderRepository.findAll();
    }

    public Optional<Order> getOrderById(Long orderId) {
        return orderRepository.findById(orderId);
    }


    public Order addOrderForCustomer(Long userId, OrderRequestDTO orderRequestDTO) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with ID: " + userId));
        Order order = new Order();
        order.setOrderDate(new Date());
        order.setUser(user);
        order.setTotal(orderRequestDTO.getTotal());

        Order savedOrder = orderRepository.save(order);

        for (CommandeLineRequestDTO commandeLineDTO : orderRequestDTO.getCommandeLines()) {
            Dish dish = dishRepo.findById(commandeLineDTO.getDishId())
                    .orElseThrow(() -> new DishNotFoundException("Dish not found with ID: " + commandeLineDTO.getDishId()));

            CommandeLine commandeLine = new CommandeLine();
            commandeLine.setCommandeLineDate(new Date());
            commandeLine.setQuantityOrdered(commandeLineDTO.getQuantity());
            commandeLine.setOrder(savedOrder);
            commandeLine.setDish(dish);
            dish.setQuantityAvailable(dish.getQuantityAvailable() - commandeLineDTO.getQuantity());

            commandeLineRepo.save(commandeLine);
        }

        return savedOrder;
    }


    private List<CommandeLine> createCommandeLines(List<Long> dishIds, List<Integer> quantities, Long orderId) {
        // Validate the sizes of dishIds and quantities are the same
        if (dishIds.size() != quantities.size()) {
            throw new IllegalArgumentException("Sizes of dishIds and quantities must match.");
        }

        // Create CommandeLines for each Dish and quantity
        CommandeLine commandeline = new CommandeLine();
        return IntStream.range(0, dishIds.size())
                .mapToObj(i -> {
                    Dish dish = dishService.getDishById(dishIds.get(i)).orElseThrow();
                    int quantity = quantities.get(i);
                    commandeline.setOrder(orderRepository.findById(orderId).get());
                    commandeline.setCommandeLineDate(new Date());
                    commandeline.setDish(dish);
                    commandeline.setQuantityOrdered(quantity);
                    return commandeline;
                })
                .collect(Collectors.toList());
    }

    public void updateOrder(Long orderId, Order updatedOrder) {
        orderRepository.findById(orderId).ifPresent(order -> {
            order.setOrderDate(updatedOrder.getOrderDate());
            order.setUser(updatedOrder.getUser());
            order.setCommandeLines(updatedOrder.getCommandeLines());
            orderRepository.save(order);
        });
    }


    public void deleteOrder(Long orderId) {
        orderRepository.deleteById(orderId);
    }


    public List<OrderDTO> getOrdersForUser(Long userId) {
        User user = userRepo.findById(userId).orElseThrow(() -> new UserNotFoundException("User not found with ID: " + userId));
        ;
        List<Order> userOrders = orderRepository.findOrderByUser(user);

        return userOrders.stream()
                .map(order -> modelMapper.map(order, OrderDTO.class))
                .collect(Collectors.toList());
    }

    public Long getOrderNB(){
        return orderRepository.count();
    }

    public long getOrderNbByDate(Date startDate, Date endDate) {
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
        return orderRepository.countByOrderDateBetween(startDate, endDate);
    }









}



