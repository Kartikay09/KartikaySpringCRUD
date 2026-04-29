package com.example.KartikaySpringCRUD.repository;

import com.example.KartikaySpringCRUD.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, Integer> {
}
