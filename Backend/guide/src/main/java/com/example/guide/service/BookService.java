package com.example.guide.service;

import com.example.guide.domain.Book;
import com.example.guide.dto.BookDTO;
import com.example.guide.dto.BookDTO2;

import java.util.List;

public interface BookService {
    List<Book> listAll();

    Book createBook(BookDTO bookDTO);

    Book getBookById(Long bookId);

    Book updateBook(Long bookId, BookDTO bookDTO);

    void deleteBook(Long bookId);

    List<BookDTO2> listBookEds();
}
