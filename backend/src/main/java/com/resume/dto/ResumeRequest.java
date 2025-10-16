package com.resume.dto;

import java.util.List;
import java.util.Map;

public class ResumeRequest {
    private Map<String, String> personalInfo;
    private String summary;
    private List<Map<String, Object>> experiences;
    private List<Map<String, Object>> education;
    private List<String> skills;
    private String templateId;
    private String name;

    // Constructors
    public ResumeRequest() {}

    // Getters and Setters
    public Map<String, String> getPersonalInfo() { return personalInfo; }
    public void setPersonalInfo(Map<String, String> personalInfo) { this.personalInfo = personalInfo; }
    
    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }
    
    public List<Map<String, Object>> getExperiences() { return experiences; }
    public void setExperiences(List<Map<String, Object>> experiences) { this.experiences = experiences; }
    
    public List<Map<String, Object>> getEducation() { return education; }
    public void setEducation(List<Map<String, Object>> education) { this.education = education; }
    
    public List<String> getSkills() { return skills; }
    public void setSkills(List<String> skills) { this.skills = skills; }
    
    public String getTemplateId() { return templateId; }
    public void setTemplateId(String templateId) { this.templateId = templateId; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}