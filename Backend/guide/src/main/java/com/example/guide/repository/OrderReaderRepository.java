package com.example.guide.repository;

import com.example.guide.domain.OrderReader;
import com.example.guide.domain.Reader;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderReaderRepository extends JpaRepository<OrderReader, Long> {
    List<OrderReader> findAllByReader(Reader reader);
}
