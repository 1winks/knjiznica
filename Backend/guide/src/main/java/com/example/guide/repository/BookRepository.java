package com.example.guide.repository;

import com.example.guide.domain.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {
    Book findBookByTitle(String bookName);

    List<Book> findBooksByAuthor(String authorName);

    List<Book> findBooksByGenre(String genreName);
}
