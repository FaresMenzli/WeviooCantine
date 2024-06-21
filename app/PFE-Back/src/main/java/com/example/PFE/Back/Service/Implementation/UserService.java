package com.example.PFE.Back.Service.Implementation;

import com.example.PFE.Back.DTO.Sales;
import com.example.PFE.Back.DTO.UserDTO;
import com.example.PFE.Back.DTO.UserForDashboard;
import com.example.PFE.Back.DTO.UserStats;
import com.example.PFE.Back.Exceptions.UserNotFoundException;
import com.example.PFE.Back.Model.Order;
import com.example.PFE.Back.Model.User;
import com.example.PFE.Back.Model.UserRole;
import com.example.PFE.Back.Repo.OrderRepo;
import com.example.PFE.Back.Repo.UserRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {
    @Autowired
    private OrderRepo orderRepo;
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ModelMapper modelMapper;

    public List<User> userList() {

        return (List<User>) userRepo.findAll();

    }

    public Optional<User> getUserById(Long userId) {
        return userRepo.findById(userId);
    }

    public User createUser(User user) {
        return userRepo.save(user);
    }

    public void updateUser(Long userId, User updatedUser) {
        userRepo.findById(userId).ifPresent(user -> {
            user.setUserFirstName(updatedUser.getUsername());
            user.setUserEmail(updatedUser.getUserEmail());
            user.setUserPassword(updatedUser.getUserPassword());
            userRepo.save(user);
        });
    }

    public Long deleteUserById(Long id) {
        userRepo.deleteById(id);
        return 99L;
    }

    public UserDTO getUserByUserEmail(String email) {
        User user = userRepo.findByUserEmail(email).orElseThrow(() -> new UsernameNotFoundException("User Not Found"));
        return modelMapper.map(user, UserDTO.class);

    }

    public void changeUserRole(Long userId, UserRole newRole) {
        User user = userRepo.findUserByUserId(userId);
        user.changeUserRole(newRole);
        userRepo.save(user);
    }


    public List<UserStats> getAllUsersStats(Optional<Date> startDateOptional, Optional<Date> endDateOptional) {
        return getUsersWithOrdersBetweenDates(startDateOptional,endDateOptional).stream().map(user -> {
            int orderCount = user.getOrders().size();
            double totalCost = user.getOrders().stream()
                    .mapToDouble(Order::getTotal)
                    .sum();
            return new UserStats(user, orderCount, totalCost);
        }).sorted(Comparator.comparing(UserStats::getOrdersNB).reversed()).collect(Collectors.toList());
    }

    public UserForDashboard getUserStatsForDashboard(Optional<Date> startDateOptional, Optional<Date> endDateOptional) {
        List<UserStats> userStatsList = getAllUsersStats(startDateOptional,endDateOptional);
        Integer nbTotalOrders = userStatsList.stream().mapToInt(UserStats::getOrdersNB).sum();
        Double coastTotalOrders = userStatsList.stream().mapToDouble(UserStats::getOrdersCoast).sum();
        return new UserForDashboard(userStatsList, userStatsList.size(), (int) getAllUsersStats(startDateOptional,endDateOptional).stream().filter(user -> user.getOrdersNB() > 0).count(), (int) getAllUsersStats(startDateOptional,endDateOptional).stream().filter(user -> user.getOrdersNB() > 1).count(), coastTotalOrders, nbTotalOrders);
    }

    public List<User> getUsersWithOrdersBetweenDates(Optional<Date> startDateOptional, Optional<Date> endDateOptional) {
        if (startDateOptional.isPresent() && endDateOptional.isPresent()) {
            List<User> users = userRepo.findUsersWithOrdersBetweenDates(startDateOptional.get(), endDateOptional.get());
            users.forEach(user -> user.setOrders(
                    user.getOrders().stream()
                            .filter(order -> order.getOrderDate().compareTo(startDateOptional.get()) >= 0 && order.getOrderDate().compareTo(endDateOptional.get()) <= 0)
                            .collect(Collectors.toList())
            ));
        return users;


        }
        return userList();
    }
    public UserForDashboard getUserStatsByDate(Optional<Date> startDateOptional, Optional<Date> endDateOptional) {


        return null;
    }
}

