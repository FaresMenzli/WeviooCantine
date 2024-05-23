package com.example.PFE.Back.Repo;

import com.example.PFE.Back.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User,Long> {
    Optional<User> findByUserEmail(String email);
    boolean existsByUserEmail(String username);

    User findUserByUserId(Long userId);
}
