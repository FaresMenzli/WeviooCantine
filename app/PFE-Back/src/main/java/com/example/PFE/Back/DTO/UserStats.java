package com.example.PFE.Back.DTO;

import com.example.PFE.Back.Model.User;
import com.example.PFE.Back.Model.UserRole;
import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserStats {
   private User user;
    private Integer ordersNB;
    private Double ordersCoast;
}
