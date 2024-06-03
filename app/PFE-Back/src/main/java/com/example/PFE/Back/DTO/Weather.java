package com.example.PFE.Back.Model;

import lombok.Data;
import lombok.Getter;

@Data
public class Weather {
    private String description;
    private int code;
    private String icon;
}
