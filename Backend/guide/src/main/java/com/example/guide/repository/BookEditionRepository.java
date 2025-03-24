package com.example.guide.repository;

import com.example.guide.domain.Book;
import com.example.guide.domain.BookEdition;
import com.example.guide.domain.Edition;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookEditionRepository extends JpaRepository<BookEdition, Long> {
    List<BookEdition> findAllByBook(Book book);
    BookEdition findByEdition(Edition edition);
}
