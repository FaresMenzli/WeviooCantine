package com.example.PFE.Back.DTO;

import jakarta.annotation.sql.DataSourceDefinitions;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class UserDTO {
    private String userId ;
    private String userEmail ;
    private String userFirstName ;
    private String userLastName ;
}
