package com.example.PFE.Back.Auth.Service;

import com.example.PFE.Back.Auth.AuthenticationRequest;
import com.example.PFE.Back.Auth.AuthenticationResponse;
import com.example.PFE.Back.Auth.RegisterRequest;
import com.example.PFE.Back.Exceptions.UserAlreadyExistsException;
import com.example.PFE.Back.Exceptions.UserNotFoundException;
import com.example.PFE.Back.Model.User;
import com.example.PFE.Back.Model.UserRole;
import com.example.PFE.Back.Repo.UserRepo;
import com.example.PFE.Back.Service.Implementation.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(final RegisterRequest request) {
        if (userRepo.existsByUserEmail(request.getEmail())) {
            System.out.println("******************************");
            System.out.println(userRepo.existsByUserEmail(request.getEmail()));
            throw new UserAlreadyExistsException("User with username " + request.getEmail() + " already exists");
        }
        var user = User.builder()
                .userFirstName(request.getFirstName())
                .userEmail(request.getEmail())
                .userLastName(request.getLastName())
                .userPassword(passwordEncoder.encode(request.getPassword()))
                .userRole(UserRole.COLLABORATER)
                .build();
        System.out.println("-------------------------------------------------------------------");
        System.out.println(user);
        userRepo.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(final AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUserEmail(),
                        request.getUserPassword()
                )
        );
        var user = userRepo.findByUserEmail(request.getUserEmail()).orElseThrow(()-> new UserNotFoundException(" User not found"));
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
