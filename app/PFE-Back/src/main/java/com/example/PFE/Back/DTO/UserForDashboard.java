package com.example.PFE.Back.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
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
}
