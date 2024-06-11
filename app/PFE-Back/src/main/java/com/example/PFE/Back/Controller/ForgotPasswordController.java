package com.example.PFE.Back.Controller;
import com.example.PFE.Back.Model.PasswordResetToken;
import com.example.PFE.Back.Repo.PasswordResetTokenRepository;
import com.example.PFE.Back.Service.Implementation.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Calendar;
import java.util.Date;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class ForgotPasswordController {

    @Autowired
    private PasswordResetTokenRepository tokenRepository;

    @Autowired
    private EmailService emailService;

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");

        // Generate a reset token
        String token = UUID.randomUUID().toString();
        PasswordResetToken passwordResetToken = new PasswordResetToken();
        passwordResetToken.setToken(token);
        passwordResetToken.setEmail(email);

        // Set token expiration time (e.g., 24 hours from now)
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        calendar.add(Calendar.HOUR, 24);
        passwordResetToken.setExpiryDate(calendar.getTime());

        // Save the token
        tokenRepository.save(passwordResetToken);

        // Send the reset email
        emailService.sendPasswordResetEmail(email, token);

        return ResponseEntity.ok("Password reset link sent to your email.");
    }
}
