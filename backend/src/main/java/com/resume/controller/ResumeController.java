package com.resume.controller;

import com.resume.dto.ResumeRequest;
import com.resume.service.PdfGenerationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/resume")
@CrossOrigin(origins = "http://localhost:3000")
public class ResumeController {

    @Autowired
    private PdfGenerationService pdfGenerationService;

    @PostMapping("/generate")
    public ResponseEntity<byte[]> generateResume(@RequestBody ResumeRequest resumeRequest) {
        try {
            byte[] pdfBytes = pdfGenerationService.generateResumePdf(resumeRequest);
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            
            String firstName = resumeRequest.getPersonalInfo() != null ? 
                resumeRequest.getPersonalInfo().get("firstName") : "resume";
            String lastName = resumeRequest.getPersonalInfo() != null ? 
                resumeRequest.getPersonalInfo().get("lastName") : "";
                
            String filename = "resume-" + firstName + "-" + lastName + ".pdf";
            headers.setContentDispositionFormData("attachment", filename);
            
            return ResponseEntity.ok()
                .headers(headers)
                .body(pdfBytes);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}