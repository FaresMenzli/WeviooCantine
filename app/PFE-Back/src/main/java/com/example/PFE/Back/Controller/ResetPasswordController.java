package com.example.PFE.Back.Controller;

import com.example.PFE.Back.Model.PasswordResetToken;
import com.example.PFE.Back.Model.User;
import com.example.PFE.Back.Repo.PasswordResetTokenRepository;
import com.example.PFE.Back.Repo.UserRepo;
import com.example.PFE.Back.Service.Implementation.EmailService;
import jakarta.validation.constraints.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ResetPasswordController {

    @Autowired
    private PasswordResetTokenRepository tokenRepository;

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        String newPassword = request.get("password");

        PasswordResetToken passwordResetToken = tokenRepository.findByToken(token);
        if (passwordResetToken == null || passwordResetToken.getExpiryDate().before(new Date())) {
            return ResponseEntity.badRequest().body("Invalid or expired token.");
        }

        // Update the user's password
        User user = userRepository.findByUserEmail(passwordResetToken.getEmail()).get();
        user.setUserPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        // Delete the token after use
        tokenRepository.delete(passwordResetToken);
        emailService.sendPasswordUpdated(user.getUserEmail());
        return ResponseEntity.ok("Password reset successfully.");
    }
}

