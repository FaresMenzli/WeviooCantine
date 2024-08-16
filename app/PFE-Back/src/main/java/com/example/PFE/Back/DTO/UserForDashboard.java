package com.example.PFE.Back.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Setter
@Getter
@AllArgsConstructor
public class UserForDashboard {
    private List<UserStats> userStatsList;
    private Integer nbTotalUsers;
    private Integer nbUsersOrderedAtLeast1Time;
    private Integer nbUsersOrderedMoreThan1Time;
    private Double coastTotalOrders;
    private Integer nbTotalOrders;
    private Map<Object,Integer> monthlyOrderCounts;
    private Map<Object,Integer> monthlyOrderCountsForCustomer;
    private Map<Object,Double> monthlyOrderAverageByCustomer;
    private Map<Object, Map<String, Object>> combinedMap ;
   private List<DishSalesDetails> dishSalesDetailsList;

    public UserForDashboard(List<UserStats> userStatsList, Integer nbTotalUsers, Integer nbUsersOrderedAtLeast1Time, Integer nbUsersOrderedMoreThan1Time, Double coastTotalOrders, Integer nbTotalOrders, Map<Object, Integer> monthlyOrderCounts, Map<Object, Double> monthlyOrderAverageByCustomer) {
        this.userStatsList = userStatsList;
        this.nbTotalUsers = nbTotalUsers;
        this.nbUsersOrderedAtLeast1Time = nbUsersOrderedAtLeast1Time;
        this.nbUsersOrderedMoreThan1Time = nbUsersOrderedMoreThan1Time;
        this.coastTotalOrders = coastTotalOrders;
        this.nbTotalOrders = nbTotalOrders;
        this.monthlyOrderCounts = monthlyOrderCounts;
        this.monthlyOrderAverageByCustomer = monthlyOrderAverageByCustomer;

    }



}
