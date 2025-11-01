package com.resume.controller;

import com.resume.dto.ResumeRequest;
import com.resume.model.Resume;
import com.resume.model.User;
import com.resume.service.ResumeService;
import com.resume.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/user/resumes")
@CrossOrigin(origins = "http://localhost:3000")
public class UserResumeController {
    
    @Autowired
    private ResumeService resumeService;
    
    @Autowired
    private UserService userService;
    
    @GetMapping
    public ResponseEntity<?> getUserResumes(Authentication authentication) {
        try {
            if (authentication == null) {
                Map<String, String> error = new HashMap<>();
                error.put("message", "Authentication required");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
            }
            
            User user = userService.getUserByEmail(authentication.getName());
            List<Resume> resumes = resumeService.getUserResumes(user);
            return ResponseEntity.ok(resumes);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Error fetching resumes: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getResume(@PathVariable Long id, Authentication authentication) {
        try {
            if (authentication == null) {
                Map<String, String> error = new HashMap<>();
                error.put("message", "Authentication required");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
            }
            
            User user = userService.getUserByEmail(authentication.getName());
            Resume resume = resumeService.getUserResume(id, user)
                    .orElseThrow(() -> new RuntimeException("Resume not found"));
            return ResponseEntity.ok(resume);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Error retrieving resume: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
    
    @PostMapping
    public ResponseEntity<?> saveResume(@RequestBody ResumeRequest request, Authentication authentication) {
        try {
            if (authentication == null) {
                Map<String, String> error = new HashMap<>();
                error.put("message", "Authentication required");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
            }
            
            User user = userService.getUserByEmail(authentication.getName());
            
            // Validate resume name
            if (request.getName() == null || request.getName().trim().isEmpty()) {
                Map<String, String> error = new HashMap<>();
                error.put("message", "Resume name is required");
                return ResponseEntity.badRequest().body(error);
            }
            
            // Validate template ID
            if (request.getTemplateId() == null || request.getTemplateId().trim().isEmpty()) {
                Map<String, String> error = new HashMap<>();
                error.put("message", "Template ID is required");
                return ResponseEntity.badRequest().body(error);
            }
            
            Resume resume = resumeService.saveResume(request, user);
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Resume saved successfully");
            response.put("resume", resume);
            
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Error saving resume: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateResume(@PathVariable Long id, @RequestBody ResumeRequest request, Authentication authentication) {
        try {
            if (authentication == null) {
                Map<String, String> error = new HashMap<>();
                error.put("message", "Authentication required");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
            }
            
            User user = userService.getUserByEmail(authentication.getName());
            Resume resume = resumeService.updateResume(id, request, user);
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Resume updated successfully");
            response.put("resume", resume);
            
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Error updating resume: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteResume(@PathVariable Long id, Authentication authentication) {
        try {
            if (authentication == null) {
                Map<String, String> error = new HashMap<>();
                error.put("message", "Authentication required");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
            }
            
            User user = userService.getUserByEmail(authentication.getName());
            resumeService.deleteResume(id, user);
            
            Map<String, String> response = new HashMap<>();
            response.put("message", "Resume deleted successfully");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Error deleting resume: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
}