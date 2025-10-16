package com.resume.controller;

import com.resume.dto.ResumeRequest;
import com.resume.model.Resume;
import com.resume.model.User;
import com.resume.service.ResumeService;
import com.resume.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public ResponseEntity<List<Resume>> getUserResumes(Authentication authentication) {
        try {
            User user = userService.getUserByEmail(authentication.getName());
            List<Resume> resumes = resumeService.getUserResumes(user);
            return ResponseEntity.ok(resumes);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Resume> getResume(@PathVariable Long id, Authentication authentication) {
        try {
            User user = userService.getUserByEmail(authentication.getName());
            Resume resume = resumeService.getUserResume(id, user)
                    .orElseThrow(() -> new RuntimeException("Resume not found"));
            return ResponseEntity.ok(resume);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping
    public ResponseEntity<?> saveResume(@RequestBody ResumeRequest request, Authentication authentication) {
        try {
            User user = userService.getUserByEmail(authentication.getName());
            
            if (request.getName() == null || request.getName().trim().isEmpty()) {
                Map<String, String> error = new HashMap<>();
                error.put("message", "Resume name is required");
                return ResponseEntity.badRequest().body(error);
            }
            
            Resume resume = resumeService.saveResume(request, user);
            return ResponseEntity.ok(resume);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateResume(@PathVariable Long id, @RequestBody ResumeRequest request, Authentication authentication) {
        try {
            User user = userService.getUserByEmail(authentication.getName());
            Resume resume = resumeService.updateResume(id, request, user);
            return ResponseEntity.ok(resume);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteResume(@PathVariable Long id, Authentication authentication) {
        try {
            User user = userService.getUserByEmail(authentication.getName());
            resumeService.deleteResume(id, user);
            
            Map<String, String> response = new HashMap<>();
            response.put("message", "Resume deleted successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}