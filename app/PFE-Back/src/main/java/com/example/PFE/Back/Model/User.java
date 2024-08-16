package com.example.PFE.Back.Model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serializable;
import java.util.Collection;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name="User")
public class User implements Serializable,UserDetails {
@Id
@GeneratedValue(strategy = GenerationType.AUTO)
    private Long userId;
    private String userFirstName;
    private String userLastName;
    private String userEmail;
   @JsonIgnore
    private String userPassword;
    @Enumerated(EnumType.STRING)
    private UserRole userRole;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("user")
    private List<Order> Orders;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Convert user role to Spring Security's GrantedAuthority
        return List.of(new SimpleGrantedAuthority(userRole.name()));
    }
    @Override
    public String getUsername() {
        return userEmail;
    }


    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    @JsonIgnore
    public String getPassword() {
        return userPassword;
    }


    public void changeUserRole(UserRole newRole) {
        if (newRole != null) {
            this.userRole = newRole;
        } else {
            throw new IllegalArgumentException("UserRole cannot be null");
        }
    }
}
