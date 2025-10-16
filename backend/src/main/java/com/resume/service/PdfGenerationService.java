package com.resume.service;

import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.List;
import com.itextpdf.layout.element.ListItem;
import com.itextpdf.io.font.constants.StandardFonts;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.resume.dto.ResumeRequest;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Map;

@Service
public class PdfGenerationService {

    public byte[] generateResumePdf(ResumeRequest resumeRequest) throws IOException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(baos);
        PdfDocument pdfDoc = new PdfDocument(writer);
        Document document = new Document(pdfDoc);

        // Set up fonts
        PdfFont font = PdfFontFactory.createFont(StandardFonts.HELVETICA);
        PdfFont boldFont = PdfFontFactory.createFont(StandardFonts.HELVETICA_BOLD);
        
        // Header Section
        Map<String, String> personalInfo = resumeRequest.getPersonalInfo();
        if (personalInfo != null) {
            String firstName = personalInfo.get("firstName");
            String lastName = personalInfo.get("lastName");
            
            if (firstName != null && lastName != null) {
                Paragraph name = new Paragraph(firstName + " " + lastName)
                    .setFont(boldFont).setFontSize(18);
                document.add(name);
            }

            // Contact Information
            StringBuilder contactBuilder = new StringBuilder();
            if (personalInfo.get("email") != null) {
                contactBuilder.append(personalInfo.get("email"));
            }
            if (personalInfo.get("phone") != null) {
                if (contactBuilder.length() > 0) contactBuilder.append(" | ");
                contactBuilder.append(personalInfo.get("phone"));
            }
            if (personalInfo.get("address") != null) {
                if (contactBuilder.length() > 0) contactBuilder.append(" | ");
                contactBuilder.append(personalInfo.get("address"));
            }
            
            if (contactBuilder.length() > 0) {
                Paragraph contactInfo = new Paragraph(contactBuilder.toString());
                document.add(contactInfo);
            }
        }

        document.add(new Paragraph("\n"));

        // Summary Section
        if (resumeRequest.getSummary() != null && !resumeRequest.getSummary().isEmpty()) {
            Paragraph summaryHeader = new Paragraph("PROFESSIONAL SUMMARY")
                .setFont(boldFont).setFontSize(12);
            document.add(summaryHeader);
            
            Paragraph summary = new Paragraph(resumeRequest.getSummary())
                .setMarginBottom(10);
            document.add(summary);
        }

        // Experience Section
        if (resumeRequest.getExperiences() != null && !resumeRequest.getExperiences().isEmpty()) {
            Paragraph experienceHeader = new Paragraph("WORK EXPERIENCE")
                .setFont(boldFont).setFontSize(12);
            document.add(experienceHeader);

            for (Map<String, Object> exp : resumeRequest.getExperiences()) {
                String position = (String) exp.get("position");
                String company = (String) exp.get("company");
                String startDate = (String) exp.get("startDate");
                String endDate = (String) exp.get("endDate");
                Boolean current = (Boolean) exp.get("current");
                String description = (String) exp.get("description");
                
                if (position != null && company != null) {
                    String dateRange = startDate + " - " + (current != null && current ? "Present" : (endDate != null ? endDate : ""));
                    Paragraph expPara = new Paragraph()
                        .setFont(boldFont)
                        .add(position + " at " + company + " (" + dateRange + ")");
                    document.add(expPara);
                    
                    if (description != null && !description.isEmpty()) {
                        Paragraph descPara = new Paragraph(description)
                            .setMarginBottom(8);
                        document.add(descPara);
                    }
                }
                document.add(new Paragraph());
            }
        }

        // Education Section
        if (resumeRequest.getEducation() != null && !resumeRequest.getEducation().isEmpty()) {
            Paragraph educationHeader = new Paragraph("EDUCATION")
                .setFont(boldFont).setFontSize(12);
            document.add(educationHeader);

            for (Map<String, Object> edu : resumeRequest.getEducation()) {
                String degree = (String) edu.get("degree");
                String institution = (String) edu.get("institution");
                String field = (String) edu.get("field");
                String startDate = (String) edu.get("startDate");
                String endDate = (String) edu.get("endDate");
                String gpa = (String) edu.get("gpa");
                
                if (degree != null && institution != null) {
                    Paragraph eduPara = new Paragraph()
                        .setFont(boldFont)
                        .add(degree + " - " + institution);
                    document.add(eduPara);
                    
                    StringBuilder eduDetails = new StringBuilder();
                    if (field != null && !field.isEmpty()) {
                        eduDetails.append(field);
                    }
                    if (startDate != null && endDate != null) {
                        if (eduDetails.length() > 0) eduDetails.append(" | ");
                        eduDetails.append(startDate).append(" - ").append(endDate);
                    }
                    if (gpa != null && !gpa.isEmpty()) {
                        if (eduDetails.length() > 0) eduDetails.append(" | ");
                        eduDetails.append("GPA: ").append(gpa);
                    }
                    
                    if (eduDetails.length() > 0) {
                        Paragraph detailsPara = new Paragraph(eduDetails.toString());
                        document.add(detailsPara);
                    }
                }
                document.add(new Paragraph());
            }
        }

        // Skills Section
        if (resumeRequest.getSkills() != null && !resumeRequest.getSkills().isEmpty()) {
            Paragraph skillsHeader = new Paragraph("SKILLS")
                .setFont(boldFont).setFontSize(12);
            document.add(skillsHeader);

            List skillsList = new List();
            for (String skill : resumeRequest.getSkills()) {
                skillsList.add(new ListItem(skill));
            }
            document.add(skillsList);
        }

        document.close();
        return baos.toByteArray();
    }
}