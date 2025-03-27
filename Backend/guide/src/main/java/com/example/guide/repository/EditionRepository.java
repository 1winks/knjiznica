package com.example.guide.repository;

import com.example.guide.domain.Edition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface EditionRepository extends JpaRepository<Edition, Long> {
    Edition findEditionByIsbn(Long isbn);
    List<Edition> findEditionsByAvailableTrue();

    @Query("SELECT e FROM Edition e WHERE e.returnDate IS NULL OR e.returnDate < :date")
    List<Edition> findEditionsAvailableAfterDate(@Param("date") LocalDate date);
}
