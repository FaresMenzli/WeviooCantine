package com.example.PFE.Back.Controller;

import com.example.PFE.Back.DTO.CreateOrderRequest;
import com.example.PFE.Back.DTO.OrderDTO;
import com.example.PFE.Back.DTO.OrderRequestDTO;
import com.example.PFE.Back.Model.Order;
import com.example.PFE.Back.Service.Implementation.DishService;
import com.example.PFE.Back.Service.Implementation.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = orderService.getAllOrders();
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long orderId) {
        return orderService.getOrderById(orderId)
                .map(order -> new ResponseEntity<>(order, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<OrderDTO>> getOrdersForUser(@PathVariable Long userId) {
        List<OrderDTO> userOrders = orderService.getOrdersForUser(userId);

        return new ResponseEntity<>(userOrders, HttpStatus.OK);
    }
    @GetMapping("/getOrdersByDate")
    public List<Order> getOrdersByDate(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date date) {
        return orderService.getOrdersByDate(date);
    }

    @PostMapping("orderForUser/{userId}")
    public ResponseEntity<Order> addOrderForCustomer(
            @PathVariable Long userId,
            @RequestBody OrderRequestDTO orderRequestDTO) {
        System.out.println("++++++++++++++++++++++++++++++++++++++++++++++++++++");
        System.out.println(orderRequestDTO.getTotal());
        Order savedOrder = orderService.addOrderForCustomer(userId, orderRequestDTO);

        return new ResponseEntity<>(savedOrder, HttpStatus.CREATED);
    }

    @PutMapping("/{orderId}")
    public ResponseEntity<Order> updateOrder(@PathVariable Long orderId, @RequestBody Order updatedOrder) {
        orderService.updateOrder(orderId, updatedOrder);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{orderId}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long orderId) {
        orderService.deleteOrder(orderId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
