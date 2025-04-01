package com.example.guide.service.impl;

import com.example.guide.authentication.models.User;
import com.example.guide.authentication.repository.UserRepository;
import com.example.guide.controller.responses.BookDeletionException;
import com.example.guide.domain.*;
import com.example.guide.dto.*;
import com.example.guide.repository.BookEditionRepository;
import com.example.guide.repository.BookRepository;
import com.example.guide.repository.EditionOrderRepository;
import com.example.guide.repository.OrderReaderRepository;
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

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private OrderReaderRepository orderReaderRepo;

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

    @Override
    public List<BookDTO2> listBookEds() {
        List<BookDTO2> bookDTOs = new ArrayList<>();
        List<Book> books = listAll();
        for (Book book : books) {
            BookDTO2 bookDTO = new BookDTO2();
            bookDTO.setTitle(book.getTitle());
            bookDTO.setAuthor(book.getAuthor());
            bookDTO.setGenre(book.getGenre());
            bookDTO.setPopularity(book.getPopularity());
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

    @Override
    public List<BookDTO3> listBookUser(UserDTO userDTO) {
        String username = userDTO.getUsername();
        System.out.println(username);
        List<BookDTO3> userBooks = new ArrayList<>();
        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException(
                        "User not found with username: " + username));
        Reader reader = user.getReader();
        List<OrderReader> readerOrders = orderReaderRepo.findAllByReader(reader);
        for (OrderReader orderReader : readerOrders) {
            Order order = orderReader.getOrder();
            List<EditionOrder> editionOrders = editionOrderRepo.findAllByOrder(order);
            for (EditionOrder editionOrder : editionOrders) {
                Edition edition = editionOrder.getEdition();
                BookEdition bookEdition = bookEditionRepo.findByEdition(edition);
                Book book = bookEdition.getBook();
                BookDTO3 bookDTO3 = new BookDTO3();
                bookDTO3.setTitle(book.getTitle());
                bookDTO3.setAuthor(book.getAuthor());
                bookDTO3.setGenre(book.getGenre());
                bookDTO3.setIsbn(edition.getIsbn());
                userBooks.add(bookDTO3);
            }
        }
        return userBooks;
    }
}
