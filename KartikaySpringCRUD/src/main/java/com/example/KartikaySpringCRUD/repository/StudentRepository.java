package com.example.KartikaySpringCRUD.repository;

import com.example.KartikaySpringCRUD.model.Student;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public class StudentRepository {

    private final JdbcTemplate jdbc;

    public StudentRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public void save(Student s) {
        jdbc.update("INSERT INTO student(name,email,course) VALUES(?,?,?)",
                s.getName(), s.getEmail(), s.getCourse());
    }

    public List<Student> findAll() {
        return jdbc.query("SELECT * FROM student",
                (rs, i) -> new Student(
                        rs.getInt("id"),
                        rs.getString("name"),
                        rs.getString("email"),
                        rs.getString("course")));
    }

    public Student findById(int id) {
        return jdbc.queryForObject("SELECT * FROM student WHERE id=?",
                new Object[] { id },
                (rs, i) -> new Student(
                        rs.getInt("id"),
                        rs.getString("name"),
                        rs.getString("email"),
                        rs.getString("course")));
    }

    public void update(int id, Student s) {
        jdbc.update("UPDATE student SET name=?, email=?, course=? WHERE id=?",
                s.getName(), s.getEmail(), s.getCourse(), id);
    }

    public void delete(int id) {
        jdbc.update("DELETE FROM student WHERE id=?", id);
    }
}