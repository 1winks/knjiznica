package com.example.guide.service.impl;

import com.example.guide.domain.Book;
import com.example.guide.dto.BookDTO;
import com.example.guide.repository.BookRepository;
import com.example.guide.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BookServiceJpa implements BookService {
    @Autowired
    private BookRepository bookRepo;

    @Override
    public List<Book> listAll() {
        return bookRepo.findAll();
    }

    @Override
    public Book getBookById(Long bookId) {
        return bookRepo.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found with ID: " + bookId));
    }

    @Override
    public Book createBook(BookDTO bookDTO) {
        Book book = new Book();
        book.setTitle(bookDTO.getTitle());
        book.setAuthor(bookDTO.getAuthor());
        book.setGenre(bookDTO.getGenre());
        book.setCover(bookDTO.getCover());
        return bookRepo.save(book);
    }

    @Override
    public Book updateBook(Long bookId, BookDTO bookDTO) {
        Book book = bookRepo.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found with ID: " + bookId));
        book.setTitle(bookDTO.getTitle());
        book.setAuthor(bookDTO.getAuthor());
        book.setGenre(bookDTO.getGenre());
        book.setCover(bookDTO.getCover());
        return bookRepo.save(book);
    }

    @Override
    public void deleteBook(Long bookId) {
        Book book = bookRepo.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found with ID: " + bookId));
        bookRepo.delete(book);
    }
}
