package com.example.PFE.Back.Model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.security.PrivateKey;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CommandeLine {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long commandeLineId ;
    @ManyToOne
    @JoinColumn(name = "dish_id")
    private Dish dish;
    @ManyToOne
    @JoinColumn(name = "order_id")
    @JsonIgnoreProperties("commandeLines")
    private Order order;
    private int quantityOrdered;
    private Date commandeLineDate;

    public CommandeLine(final Date date, final Dish dish, final int quantity) {
    }

    public CommandeLine(final Date date, final Order order, final Dish dish, final int quantity) {
    }


}
