package com.example.PFE.Back.Repo;

import com.example.PFE.Back.Model.Order;
import com.example.PFE.Back.Model.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;
import java.util.List;


public interface OrderRepo extends CrudRepository<Order,Long> {
    List<Order> findOrderByUser(User user);
    List<Order> findByOrderDate(Date date);
    default List<Order> findByDateWithLogging(Date date) {

        return findByOrderDate(date);
    }
    List<Order> findByOrderDateBetween(Date startDate, Date endDate);
}
