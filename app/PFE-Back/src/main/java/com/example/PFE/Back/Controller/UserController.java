package com.example.PFE.Back.Controller;

import com.example.PFE.Back.Auth.AuthenticationRequest;
import com.example.PFE.Back.DTO.Sales;
import com.example.PFE.Back.DTO.UserDTO;
import com.example.PFE.Back.DTO.UserForDashboard;
import com.example.PFE.Back.DTO.UserStats;
import com.example.PFE.Back.Model.User;
import com.example.PFE.Back.Model.UserRole;
import com.example.PFE.Back.Service.Implementation.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    UserService userService;


    @PostMapping("/getUser")
    public ResponseEntity<?> getUserByEmail(@RequestBody AuthenticationRequest request) {
        System.out.println(request.getUserEmail());
        UserDTO user = userService.getUserByUserEmail(request.getUserEmail());
        if (user != null) {
            return  ResponseEntity.ok(user);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(value = {"userForDashboard", "userForDashboard/{userId}"})
    public UserForDashboard getUsersStats(@PathVariable(required = false) Long userId,@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date start, @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date end) {

        Optional<Date> startDateOptional = Optional.ofNullable(start);
        Optional<Date> endDateOptional = Optional.ofNullable(end);


        return userService.getUserStatsForDashboard(userId,startDateOptional,endDateOptional);
    }
//    @GetMapping("userForDashboard/{userId}")
//    public UserForDashboard getUsersStatsForOneUser(@PathVariable(required = false) Long userId, @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date start, @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date end) {
//
//        Optional<Date> startDateOptional = Optional.ofNullable(start);
//        Optional<Date> endDateOptional = Optional.ofNullable(end);
//
//
//        return userService.getUserStatsForDashboard(userId ,startDateOptional,endDateOptional);
//
//    }
    @GetMapping("User")
    public List<User> getUsers(){

        System.out.println("FARES");
        return userService.userList();
    }


    @DeleteMapping("/deleteUserById/{id}")
    public Long deleteUser(@PathVariable Long id) {

        System.out.println(id);
        System.out.println("FARES Delete");
        userService.deleteUserById(id);
        return 99L;
    }
//    @PutMapping("/{userId}/role")
//    public User changeUserRole(@PathVariable Long userId, @RequestParam UserRole newRole) {
//        userService.changeUserRole(userId, newRole);
//        return userService.findUserById(userId);
//    }
@GetMapping("roles")
public UserRole[] getAllRoles() {
    return UserRole.values();
}


    @PutMapping("/{userId}/role/{newRole}")
    public ResponseEntity<?> changeUserRole(@PathVariable Long userId, @PathVariable UserRole newRole) {
        userService.changeUserRole(userId, newRole);
       return ResponseEntity.ok(userService.getUserById(userId));
    }

//    @GetMapping("/userForDashboard")
//    public List<User>
//    getSalesInfo(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date start, @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date end) {
//
//        Optional<Date> startDateOptional = Optional.ofNullable(start);
//        Optional<Date> endDateOptional = Optional.ofNullable(end);
//
//
//        return userService.getUsersWithOrdersBetweenDates(startDateOptional, endDateOptional);
//    }

}


