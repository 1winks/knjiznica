package com.example.guide.service.impl;

import com.example.guide.controller.responses.BookDeletionException;
import com.example.guide.domain.Book;
import com.example.guide.domain.BookEdition;
import com.example.guide.domain.Edition;
import com.example.guide.domain.EditionOrder;
import com.example.guide.dto.BookDTO;
import com.example.guide.repository.BookEditionRepository;
import com.example.guide.repository.BookRepository;
import com.example.guide.repository.EditionOrderRepository;
import com.example.guide.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookServiceJpa implements BookService {
    @Autowired
    private BookRepository bookRepo;

    @Autowired
    private BookEditionRepository bookEditionRepo;

    @Autowired
    private EditionOrderRepository editionOrderRepo;

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
        return bookRepo.save(book);
    }

    @Override
    public Book updateBook(Long bookId, BookDTO bookDTO) {
        Book book = bookRepo.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found with ID: " + bookId));
        book.setTitle(bookDTO.getTitle());
        book.setAuthor(bookDTO.getAuthor());
        book.setGenre(bookDTO.getGenre());
        return bookRepo.save(book);
    }

    @Override
    public void deleteBook(Long bookId) {
        Book book = bookRepo.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found with ID: " + bookId));
        List<BookEdition> bookEditions = bookEditionRepo.findAllByBook(book);
        if (!bookEditions.isEmpty()) {
            throw new BookDeletionException("Cant delete books with editions!");
        }
        bookRepo.delete(book);
    }
}
