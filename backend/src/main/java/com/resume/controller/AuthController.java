package com.resume.controller;

import com.resume.dto.auth.LoginRequest;
import com.resume.dto.auth.RegisterRequest;
import com.resume.dto.auth.JwtResponse;
import com.resume.model.User;
import com.resume.service.JwtService;
import com.resume.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private JwtService jwtService;
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginRequest.getEmail(),
                    loginRequest.getPassword()
                )
            );
            
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtService.generateToken(
                (org.springframework.security.core.userdetails.User) authentication.getPrincipal()
            );
            
            User user = userService.getUserByEmail(loginRequest.getEmail());
            
            return ResponseEntity.ok(new JwtResponse(
                jwt,
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail()
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Invalid credentials");
        }
    }
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest registerRequest) {
        try {
            User user = userService.registerUser(
                registerRequest.getFirstName(),
                registerRequest.getLastName(),
                registerRequest.getEmail(),
                registerRequest.getPassword()
            );
            
            String jwt = jwtService.generateToken(
                userService.loadUserByUsername(user.getEmail())
            );
            
            return ResponseEntity.ok(new JwtResponse(
                jwt,
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail()
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}