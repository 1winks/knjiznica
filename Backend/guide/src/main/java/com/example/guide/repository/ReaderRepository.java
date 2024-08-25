package com.example.guide.repository;

import com.example.guide.domain.Reader;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReaderRepository extends JpaRepository<Reader, Long> {
    Reader findReaderByUserId(Long userId);

    Boolean existsByUserId(Long userId);
}
