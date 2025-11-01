package com.resume.dto;

import com.resume.model.Resume;
import java.time.LocalDateTime;

public class ResumeResponse {
    private Long id;
    private String name;
    private String templateId;
    private String personalInfo;
    private String summary;
    private String experiences;
    private String education;
    private String skills;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // Constructor from Resume entity
    public ResumeResponse(Resume resume) {
        this.id = resume.getId();
        this.name = resume.getName();
        this.templateId = resume.getTemplateId();
        this.personalInfo = resume.getPersonalInfo();
        this.summary = resume.getSummary();
        this.experiences = resume.getExperiences();
        this.education = resume.getEducation();
        this.skills = resume.getSkills();
        this.createdAt = resume.getCreatedAt();
        this.updatedAt = resume.getUpdatedAt();
    }
    
    // Default constructor
    public ResumeResponse() {}
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getTemplateId() { return templateId; }
    public void setTemplateId(String templateId) { this.templateId = templateId; }
    
    public String getPersonalInfo() { return personalInfo; }
    public void setPersonalInfo(String personalInfo) { this.personalInfo = personalInfo; }
    
    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }
    
    public String getExperiences() { return experiences; }
    public void setExperiences(String experiences) { this.experiences = experiences; }
    
    public String getEducation() { return education; }
    public void setEducation(String education) { this.education = education; }
    
    public String getSkills() { return skills; }
    public void setSkills(String skills) { this.skills = skills; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}