package com.example.guide.service.impl;

import com.example.guide.controller.responses.BookDeletionException;
import com.example.guide.domain.Book;
import com.example.guide.domain.BookEdition;
import com.example.guide.domain.Edition;
import com.example.guide.domain.EditionOrder;
import com.example.guide.dto.BookDTO;
import com.example.guide.dto.BookDTO2;
import com.example.guide.dto.EditionDTO3;
import com.example.guide.repository.BookEditionRepository;
import com.example.guide.repository.BookRepository;
import com.example.guide.repository.EditionOrderRepository;
import com.example.guide.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class BookServiceJpa implements BookService {
    @Autowired
    private BookRepository bookRepo;

    @Autowired
    private BookEditionRepository bookEditionRepo;

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

    @Override
    public List<BookDTO2> listBookEds() {
        List<BookDTO2> bookDTOs = new ArrayList<>();
        List<Book> books = listAll();
        for (Book book : books) {
            BookDTO2 bookDTO = new BookDTO2();
            bookDTO.setTitle(book.getTitle());
            bookDTO.setAuthor(book.getAuthor());
            bookDTO.setGenre(book.getGenre());
            List<BookEdition> bookEditions = bookEditionRepo.findAllByBook(book);
            List<EditionDTO3> editionsISBNS = new ArrayList<>();
            for (BookEdition bookEdition : bookEditions) {
                Edition edition = bookEdition.getEdition();
                EditionDTO3 editionDTO3 = new EditionDTO3();
                editionDTO3.setIsbn(edition.getIsbn());
                editionDTO3.setAvailable(edition.getBorrowDate() == null);
                editionDTO3.setReturnDate(edition.getReturnDate());
                editionsISBNS.add(editionDTO3);
            }
            boolean available = false;
            for (EditionDTO3 edition : editionsISBNS) {
                if (edition.getAvailable()) {
                    available = true;
                    break;
                }
            }
            bookDTO.setEditionISBNS(editionsISBNS);
            bookDTO.setAvailable(available);
            bookDTOs.add(bookDTO);
        }
        return bookDTOs;
    }
}
