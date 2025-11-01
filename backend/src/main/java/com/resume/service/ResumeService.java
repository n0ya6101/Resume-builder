package com.resume.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.resume.dto.ResumeRequest;
import com.resume.model.Resume;
import com.resume.model.User;
import com.resume.repository.ResumeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class ResumeService {
    
    @Autowired
    private ResumeRepository resumeRepository;
    
    @Autowired
    private ObjectMapper objectMapper;
    
    public List<Resume> getUserResumes(User user) {
        return resumeRepository.findByUserOrderByUpdatedAtDesc(user);
    }
    
    public Optional<Resume> getUserResume(Long id, User user) {
        return resumeRepository.findByIdAndUser(id, user);
    }
    
    @Transactional
    public Resume saveResume(ResumeRequest request, User user) {
        try {
            // Validate required fields
            if (request.getName() == null || request.getName().trim().isEmpty()) {
                throw new RuntimeException("Resume name is required");
            }
            
            if (request.getTemplateId() == null || request.getTemplateId().trim().isEmpty()) {
                throw new RuntimeException("Template ID is required");
            }
            
            Resume resume = new Resume();
            resume.setName(request.getName());
            resume.setTemplateId(request.getTemplateId());
            resume.setUser(user);
            
            // Convert objects to JSON strings for storage
            // Handle null values properly
            if (request.getPersonalInfo() != null && !request.getPersonalInfo().isEmpty()) {
                resume.setPersonalInfo(objectMapper.writeValueAsString(request.getPersonalInfo()));
            } else {
                resume.setPersonalInfo("{}");
            }
            
            resume.setSummary(request.getSummary() != null ? request.getSummary() : "");
            
            if (request.getExperiences() != null && !request.getExperiences().isEmpty()) {
                resume.setExperiences(objectMapper.writeValueAsString(request.getExperiences()));
            } else {
                resume.setExperiences("[]");
            }
            
            if (request.getEducation() != null && !request.getEducation().isEmpty()) {
                resume.setEducation(objectMapper.writeValueAsString(request.getEducation()));
            } else {
                resume.setEducation("[]");
            }
            
            if (request.getSkills() != null && !request.getSkills().isEmpty()) {
                resume.setSkills(objectMapper.writeValueAsString(request.getSkills()));
            } else {
                resume.setSkills("[]");
            }
            
            return resumeRepository.save(resume);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error processing resume data: " + e.getMessage(), e);
        }
    }
    
    @Transactional
    public Resume updateResume(Long id, ResumeRequest request, User user) {
        Resume resume = resumeRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new RuntimeException("Resume not found or you don't have permission to edit it"));
        
        try {
            // Update only if provided
            if (request.getName() != null && !request.getName().trim().isEmpty()) {
                resume.setName(request.getName());
            }
            
            if (request.getTemplateId() != null && !request.getTemplateId().trim().isEmpty()) {
                resume.setTemplateId(request.getTemplateId());
            }
            
            if (request.getPersonalInfo() != null) {
                resume.setPersonalInfo(objectMapper.writeValueAsString(request.getPersonalInfo()));
            }
            
            if (request.getSummary() != null) {
                resume.setSummary(request.getSummary());
            }
            
            if (request.getExperiences() != null) {
                resume.setExperiences(objectMapper.writeValueAsString(request.getExperiences()));
            }
            
            if (request.getEducation() != null) {
                resume.setEducation(objectMapper.writeValueAsString(request.getEducation()));
            }
            
            if (request.getSkills() != null) {
                resume.setSkills(objectMapper.writeValueAsString(request.getSkills()));
            }
            
            return resumeRepository.save(resume);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error processing resume data: " + e.getMessage(), e);
        }
    }
    
    @Transactional
    public void deleteResume(Long id, User user) {
        Resume resume = resumeRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new RuntimeException("Resume not found or you don't have permission to delete it"));
        resumeRepository.delete(resume);
    }
}