package com.example.PFE.Back.Repo;

import com.example.PFE.Back.Model.Order;
import com.example.PFE.Back.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface UserRepo extends JpaRepository<User,Long> {
    Optional<User> findByUserEmail(String email);
    boolean existsByUserEmail(String username);

    User findUserByUserId(Long userId);

    @Query("SELECT DISTINCT u FROM User u JOIN u.Orders o WHERE o.orderDate BETWEEN :startDate AND :endDate")
    List<User> findUsersWithOrdersBetweenDates(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

}
