package com.example.PFE.Back.Service.Implementation;

import com.example.PFE.Back.DTO.UserDTO;
import com.example.PFE.Back.Exceptions.UserNotFoundException;
import com.example.PFE.Back.Model.User;
import com.example.PFE.Back.Model.UserRole;
import com.example.PFE.Back.Repo.UserRepo;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
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

    public Long deleteUserById (Long id) {
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

}
