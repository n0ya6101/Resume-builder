package com.resume.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.resume.dto.ResumeRequest;
import com.resume.model.Resume;
import com.resume.model.User;
import com.resume.repository.ResumeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    
    public Resume saveResume(ResumeRequest request, User user) {
        try {
            Resume resume = new Resume();
            resume.setName(request.getName());
            resume.setTemplateId(request.getTemplateId());
            resume.setUser(user);
            
            // Convert objects to JSON strings for storage
            if (request.getPersonalInfo() != null) {
                resume.setPersonalInfo(objectMapper.writeValueAsString(request.getPersonalInfo()));
            }
            resume.setSummary(request.getSummary());
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
            throw new RuntimeException("Error processing resume data", e);
        }
    }
    
    public Resume updateResume(Long id, ResumeRequest request, User user) {
        Resume resume = resumeRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new RuntimeException("Resume not found"));
        
        try {
            if (request.getName() != null) {
                resume.setName(request.getName());
            }
            if (request.getTemplateId() != null) {
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
            throw new RuntimeException("Error processing resume data", e);
        }
    }
    
    public void deleteResume(Long id, User user) {
        Resume resume = resumeRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new RuntimeException("Resume not found"));
        resumeRepository.delete(resume);
    }
}