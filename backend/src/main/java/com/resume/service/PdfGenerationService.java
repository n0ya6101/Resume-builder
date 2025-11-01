package com.resume.service;

import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.kernel.colors.DeviceRgb;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.List;
import com.itextpdf.layout.element.ListItem;
import com.itextpdf.layout.element.LineSeparator;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;
import com.itextpdf.layout.borders.SolidBorder;
import com.itextpdf.kernel.pdf.canvas.draw.SolidLine;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.io.font.constants.StandardFonts;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.layout.borders.Border;
import com.resume.dto.ResumeRequest;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Map;

@Service
public class PdfGenerationService {

    public byte[] generateResumePdf(ResumeRequest resumeRequest) throws IOException {
        String templateId = resumeRequest.getTemplateId() != null ? resumeRequest.getTemplateId() : "template1";
        
        switch (templateId) {
            case "template2":
                return generateTemplate2(resumeRequest);
            case "template3":
                return generateTemplate3(resumeRequest);
            case "template4":
                return generateTemplate4(resumeRequest);
            case "template5":
                return generateTemplate5(resumeRequest);
            case "template6":
                return generateTemplate6(resumeRequest);
            default:
                return generateTemplate1(resumeRequest);
        }
    }

    private byte[] generateTemplate1(ResumeRequest resumeRequest) throws IOException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(baos);
        PdfDocument pdfDoc = new PdfDocument(writer);
        Document document = new Document(pdfDoc, PageSize.A4);
        document.setMargins(40, 40, 40, 40);

        PdfFont font = PdfFontFactory.createFont(StandardFonts.HELVETICA);
        PdfFont boldFont = PdfFontFactory.createFont(StandardFonts.HELVETICA_BOLD);
        
        // Colors
        DeviceRgb blueColor = new DeviceRgb(59, 89, 152); // Blue accent
        
        // Header Section with name
        Map<String, String> personalInfo = resumeRequest.getPersonalInfo();
        if (personalInfo != null) {
            String fullName = personalInfo.get("firstName") + " " + personalInfo.get("lastName");
            
            Paragraph name = new Paragraph(fullName)
                .setFont(boldFont)
                .setFontSize(24)
                .setTextAlignment(TextAlignment.CENTER)
                .setMarginBottom(5);
            document.add(name);
            
            // Add blue line separator
            SolidLine line = new SolidLine(2f);
            line.setColor(blueColor);
            LineSeparator separator = new LineSeparator(line);
            document.add(separator);
            
            // Contact Information
            StringBuilder contactBuilder = new StringBuilder();
            if (personalInfo.get("email") != null) {
                contactBuilder.append(personalInfo.get("email"));
            }
            if (personalInfo.get("phone") != null) {
                if (contactBuilder.length() > 0) contactBuilder.append(" • ");
                contactBuilder.append(personalInfo.get("phone"));
            }
            if (personalInfo.get("address") != null) {
                if (contactBuilder.length() > 0) contactBuilder.append(" • ");
                contactBuilder.append(personalInfo.get("address"));
            }
            if (personalInfo.get("linkedin") != null) {
                if (contactBuilder.length() > 0) contactBuilder.append(" • ");
                contactBuilder.append(personalInfo.get("linkedin"));
            }
            if (personalInfo.get("github") != null) {
                if (contactBuilder.length() > 0) contactBuilder.append(" • ");
                contactBuilder.append(personalInfo.get("github"));
            }
            
            if (contactBuilder.length() > 0) {
                Paragraph contactInfo = new Paragraph(contactBuilder.toString())
                    .setFont(font)
                    .setFontSize(10)
                    .setTextAlignment(TextAlignment.CENTER)
                    .setMarginBottom(15);
                document.add(contactInfo);
            }
        }

        // Summary Section
        if (resumeRequest.getSummary() != null && !resumeRequest.getSummary().isEmpty()) {
            Paragraph summaryHeader = new Paragraph("PROFESSIONAL SUMMARY")
                .setFont(boldFont)
                .setFontSize(14)
                .setMarginTop(10)
                .setMarginBottom(5);
            document.add(summaryHeader);
            
            SolidLine line = new SolidLine(1f);
            line.setColor(ColorConstants.LIGHT_GRAY);
            LineSeparator lineSep = new LineSeparator(line);
            document.add(lineSep);
            
            Paragraph summary = new Paragraph(resumeRequest.getSummary())
                .setFont(font)
                .setFontSize(11)
                .setMarginBottom(15);
            document.add(summary);
        }

        // Experience Section
        if (resumeRequest.getExperiences() != null && !resumeRequest.getExperiences().isEmpty()) {
            Paragraph experienceHeader = new Paragraph("WORK EXPERIENCE")
                .setFont(boldFont)
                .setFontSize(14)
                .setMarginTop(10)
                .setMarginBottom(5);
            document.add(experienceHeader);
            
            SolidLine line = new SolidLine(1f);
            line.setColor(ColorConstants.LIGHT_GRAY);
            LineSeparator lineSep = new LineSeparator(line);
            document.add(lineSep);

            for (Map<String, Object> exp : resumeRequest.getExperiences()) {
                String position = (String) exp.get("position");
                String company = (String) exp.get("company");
                String startDate = (String) exp.get("startDate");
                String endDate = (String) exp.get("endDate");
                Boolean current = (Boolean) exp.get("current");
                String description = (String) exp.get("description");
                
                if (position != null && company != null) {
                    // Position and company
                    Paragraph posPara = new Paragraph()
                        .setFont(boldFont)
                        .setFontSize(12)
                        .setMarginTop(10)
                        .add(position);
                    document.add(posPara);
                    
                    // Company and dates in one line
                    String dateRange = startDate + " - " + (current != null && current ? "Present" : (endDate != null ? endDate : ""));
                    Paragraph companyPara = new Paragraph()
                        .setFont(font)
                        .setFontSize(11)
                        .setItalic()
                        .add(company + " | " + dateRange)
                        .setMarginBottom(5);
                    document.add(companyPara);
                    
                    if (description != null && !description.isEmpty()) {
                        Paragraph descPara = new Paragraph(description)
                            .setFont(font)
                            .setFontSize(10)
                            .setMarginBottom(10);
                        document.add(descPara);
                    }
                }
            }
        }

        // Education Section
        if (resumeRequest.getEducation() != null && !resumeRequest.getEducation().isEmpty()) {
            Paragraph educationHeader = new Paragraph("EDUCATION")
                .setFont(boldFont)
                .setFontSize(14)
                .setMarginTop(10)
                .setMarginBottom(5);
            document.add(educationHeader);
            
            SolidLine line = new SolidLine(1f);
            line.setColor(ColorConstants.LIGHT_GRAY);
            LineSeparator lineSep = new LineSeparator(line);
            document.add(lineSep);

            for (Map<String, Object> edu : resumeRequest.getEducation()) {
                String degree = (String) edu.get("degree");
                String institution = (String) edu.get("institution");
                String field = (String) edu.get("field");
                String startDate = (String) edu.get("startDate");
                String endDate = (String) edu.get("endDate");
                String gpa = (String) edu.get("gpa");
                
                if (degree != null && institution != null) {
                    Paragraph degreePara = new Paragraph()
                        .setFont(boldFont)
                        .setFontSize(12)
                        .setMarginTop(10)
                        .add(degree);
                    document.add(degreePara);
                    
                    StringBuilder eduDetails = new StringBuilder(institution);
                    if (field != null && !field.isEmpty()) {
                        eduDetails.append(" | ").append(field);
                    }
                    if (startDate != null && endDate != null) {
                        eduDetails.append(" | ").append(startDate).append(" - ").append(endDate);
                    }
                    if (gpa != null && !gpa.isEmpty()) {
                        eduDetails.append(" | GPA: ").append(gpa);
                    }
                    
                    Paragraph detailsPara = new Paragraph(eduDetails.toString())
                        .setFont(font)
                        .setFontSize(11)
                        .setItalic()
                        .setMarginBottom(10);
                    document.add(detailsPara);
                }
            }
        }

        // Skills Section
        if (resumeRequest.getSkills() != null && !resumeRequest.getSkills().isEmpty()) {
            Paragraph skillsHeader = new Paragraph("SKILLS")
                .setFont(boldFont)
                .setFontSize(14)
                .setMarginTop(10)
                .setMarginBottom(5);
            document.add(skillsHeader);
            
            SolidLine line = new SolidLine(1f);
            line.setColor(ColorConstants.LIGHT_GRAY);
            LineSeparator lineSep = new LineSeparator(line);
            document.add(lineSep);

            // Display skills in a flowing format
            String skillsText = String.join(" • ", resumeRequest.getSkills());
            Paragraph skillsPara = new Paragraph(skillsText)
                .setFont(font)
                .setFontSize(11)
                .setMarginTop(5);
            document.add(skillsPara);
        }

        document.close();
        return baos.toByteArray();
    }

    private byte[] generateTemplate2(ResumeRequest resumeRequest) throws IOException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(baos);
        PdfDocument pdfDoc = new PdfDocument(writer);
        Document document = new Document(pdfDoc, PageSize.A4);
        document.setMargins(40, 40, 40, 40);

        PdfFont font = PdfFontFactory.createFont(StandardFonts.HELVETICA);
        PdfFont boldFont = PdfFontFactory.createFont(StandardFonts.HELVETICA_BOLD);
        
        // Green theme
        DeviceRgb greenColor = new DeviceRgb(34, 139, 34);
        DeviceRgb lightGreenBg = new DeviceRgb(240, 255, 240);
        
        // Header with green background
        Map<String, String> personalInfo = resumeRequest.getPersonalInfo();
        if (personalInfo != null) {
            Table headerTable = new Table(1);
            headerTable.setWidth(UnitValue.createPercentValue(100));
            
            Cell headerCell = new Cell();
            headerCell.setBackgroundColor(lightGreenBg);
            headerCell.setBorder(Border.NO_BORDER);
            headerCell.setPadding(15);
            
            String fullName = personalInfo.get("firstName") + " " + personalInfo.get("lastName");
            Paragraph name = new Paragraph(fullName)
                .setFont(boldFont)
                .setFontSize(22)
                .setMarginBottom(8);
            headerCell.add(name);
            
            // Contact info with emojis (using symbols)
            if (personalInfo.get("email") != null) {
                Paragraph email = new Paragraph("✉ " + personalInfo.get("email"))
                    .setFont(font)
                    .setFontSize(10)
                    .setMarginBottom(3);
                headerCell.add(email);
            }
            if (personalInfo.get("phone") != null) {
                Paragraph phone = new Paragraph("📱 " + personalInfo.get("phone"))
                    .setFont(font)
                    .setFontSize(10)
                    .setMarginBottom(3);
                headerCell.add(phone);
            }
            if (personalInfo.get("address") != null) {
                Paragraph address = new Paragraph("📍 " + personalInfo.get("address"))
                    .setFont(font)
                    .setFontSize(10)
                    .setMarginBottom(3);
                headerCell.add(address);
            }
            if (personalInfo.get("linkedin") != null) {
                Paragraph linkedin = new Paragraph("🔗 " + personalInfo.get("linkedin"))
                    .setFont(font)
                    .setFontSize(10)
                    .setMarginBottom(3);
                headerCell.add(linkedin);
            }
            if (personalInfo.get("github") != null) {
                Paragraph github = new Paragraph("💻 " + personalInfo.get("github"))
                    .setFont(font)
                    .setFontSize(10);
                headerCell.add(github);
            }
            
            headerTable.addCell(headerCell);
            document.add(headerTable);
        }

        // Summary
        if (resumeRequest.getSummary() != null && !resumeRequest.getSummary().isEmpty()) {
            Paragraph summaryHeader = new Paragraph("SUMMARY")
                .setFont(boldFont)
                .setFontSize(14)
                .setFontColor(greenColor)
                .setMarginTop(15)
                .setMarginBottom(5);
            document.add(summaryHeader);
            
            Paragraph summary = new Paragraph(resumeRequest.getSummary())
                .setFont(font)
                .setFontSize(11)
                .setMarginBottom(15);
            document.add(summary);
        }

        // Experience
        if (resumeRequest.getExperiences() != null && !resumeRequest.getExperiences().isEmpty()) {
            Paragraph experienceHeader = new Paragraph("WORK EXPERIENCE")
                .setFont(boldFont)
                .setFontSize(14)
                .setFontColor(greenColor)
                .setMarginTop(10)
                .setMarginBottom(5);
            document.add(experienceHeader);

            for (Map<String, Object> exp : resumeRequest.getExperiences()) {
                String position = (String) exp.get("position");
                String company = (String) exp.get("company");
                String startDate = (String) exp.get("startDate");
                String endDate = (String) exp.get("endDate");
                Boolean current = (Boolean) exp.get("current");
                String description = (String) exp.get("description");
                
                if (position != null && company != null) {
                    Paragraph posPara = new Paragraph()
                        .setFont(boldFont)
                        .setFontSize(12)
                        .setMarginTop(10)
                        .add(position);
                    document.add(posPara);
                    
                    String dateRange = startDate + " - " + (current != null && current ? "Present" : (endDate != null ? endDate : ""));
                    Paragraph companyPara = new Paragraph()
                        .setFont(font)
                        .setFontSize(11)
                        .add(company + " | " + dateRange)
                        .setMarginBottom(5);
                    document.add(companyPara);
                    
                    if (description != null && !description.isEmpty()) {
                        Paragraph descPara = new Paragraph(description)
                            .setFont(font)
                            .setFontSize(10)
                            .setMarginBottom(10);
                        document.add(descPara);
                    }
                }
            }
        }

        // Education
        if (resumeRequest.getEducation() != null && !resumeRequest.getEducation().isEmpty()) {
            Paragraph educationHeader = new Paragraph("EDUCATION")
                .setFont(boldFont)
                .setFontSize(14)
                .setFontColor(greenColor)
                .setMarginTop(10)
                .setMarginBottom(5);
            document.add(educationHeader);

            for (Map<String, Object> edu : resumeRequest.getEducation()) {
                String degree = (String) edu.get("degree");
                String institution = (String) edu.get("institution");
                String field = (String) edu.get("field");
                String startDate = (String) edu.get("startDate");
                String endDate = (String) edu.get("endDate");
                String gpa = (String) edu.get("gpa");
                
                if (degree != null && institution != null) {
                    Paragraph degreePara = new Paragraph()
                        .setFont(boldFont)
                        .setFontSize(12)
                        .setMarginTop(10)
                        .add(degree);
                    document.add(degreePara);
                    
                    StringBuilder eduDetails = new StringBuilder(institution);
                    if (field != null) eduDetails.append(" | ").append(field);
                    if (startDate != null && endDate != null) eduDetails.append(" | ").append(startDate).append(" - ").append(endDate);
                    if (gpa != null) eduDetails.append(" | GPA: ").append(gpa);
                    
                    Paragraph detailsPara = new Paragraph(eduDetails.toString())
                        .setFont(font)
                        .setFontSize(11)
                        .setMarginBottom(10);
                    document.add(detailsPara);
                }
            }
        }

        // Skills
        if (resumeRequest.getSkills() != null && !resumeRequest.getSkills().isEmpty()) {
            Paragraph skillsHeader = new Paragraph("SKILLS")
                .setFont(boldFont)
                .setFontSize(14)
                .setFontColor(greenColor)
                .setMarginTop(10)
                .setMarginBottom(5);
            document.add(skillsHeader);

            String skillsText = String.join(" • ", resumeRequest.getSkills());
            Paragraph skillsPara = new Paragraph(skillsText)
                .setFont(font)
                .setFontSize(11)
                .setMarginTop(5);
            document.add(skillsPara);
        }

        document.close();
        return baos.toByteArray();
    }

    // Template 3, 4, 5, 6 - simplified versions
    private byte[] generateTemplate3(ResumeRequest resumeRequest) throws IOException {
        return generateTemplate1(resumeRequest); // Use template1 style for now
    }

    private byte[] generateTemplate4(ResumeRequest resumeRequest) throws IOException {
        return generateTemplate1(resumeRequest); // Use template1 style for now
    }

    private byte[] generateTemplate5(ResumeRequest resumeRequest) throws IOException {
        return generateTemplate1(resumeRequest); // Use template1 style for now
    }

    private byte[] generateTemplate6(ResumeRequest resumeRequest) throws IOException {
        return generateTemplate1(resumeRequest); // Use template1 style for now
    }
}