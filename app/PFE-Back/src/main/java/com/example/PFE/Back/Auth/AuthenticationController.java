package com.example.PFE.Back.Auth;

import com.example.PFE.Back.Auth.Service.AuthenticationService;
import com.example.PFE.Back.Model.User;
import com.example.PFE.Back.Repo.UserRepo;
import com.example.PFE.Back.Service.Implementation.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authService;
    @Autowired
    UserService userService;
    @Autowired
    UserRepo userRepo;


    @PostMapping("/register")
    public ResponseEntity<?> register (@RequestBody RegisterRequest request){

        if (userRepo.existsByUserEmail(request.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("This e-mail is already registered");
        }
        return ResponseEntity.ok(authService.register(request));
    }
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate (@RequestBody AuthenticationRequest request){




             return ResponseEntity.ok(authService.authenticate(request));


    }

}
