package com.resume.repository;

import com.resume.model.Resume;
import com.resume.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ResumeRepository extends JpaRepository<Resume, Long> {
    List<Resume> findByUserOrderByUpdatedAtDesc(User user);
    Optional<Resume> findByIdAndUser(Long id, User user);
    void deleteByIdAndUser(Long id, User user);
    boolean existsByIdAndUser(Long id, User user); 
}