package com.example.guide.service.impl;

import com.example.guide.authentication.models.User;
import com.example.guide.authentication.repository.UserRepository;
import com.example.guide.controller.responses.BookAdderException;
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

import java.util.*;

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
    public List<BookDTO4> listPopular() {
        List<Book> books = bookRepo.findAll();
        List<BookDTO4> popular = new ArrayList<>();
        books.sort(Comparator.comparing(Book::getPopularity).reversed());
        for (int i=0; i<3; i++) {
            Book book = books.get(i);
            BookDTO4 bookDTO = new BookDTO4();
            bookDTO.setTitle(book.getTitle());
            bookDTO.setAuthor(book.getAuthor());
            bookDTO.setGenre(book.getGenre());
            String popularity;
            if (i==0) {
                popularity="1st";
            } else if (i==1) {
                popularity="2nd";
            } else {
                popularity="3rd";
            }
            bookDTO.setPopularity(popularity);
            popular.add(bookDTO);
        }
        return popular;
    }

    @Override
    public Book getBookById(Long bookId) {
        return bookRepo.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found with ID: " + bookId));
    }

    @Override
    public Book createBook(BookDTO bookDTO) {
        if (bookRepo.existsByTitle(bookDTO.getTitle())) {
            throw new BookAdderException("Book with that title already exists!");
        }
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
            throw new BookDeletionException("Can't delete books with editions!");
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

    @Override
    public Set<Book> listBookUserNum(UserDTO userDTO) {
        String username = userDTO.getUsername();
        Set<Book> booksRead = new HashSet<>();
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
                booksRead.add(book);
            }
        }
        return booksRead;
    }

    @Override
    public Set<String> getAllGenres() {
        Set<String> genres = new HashSet<>();
        List<Book> books = bookRepo.findAll();
        for (Book book : books) {
            String genre = book.getGenre();
            genres.add(genre);
        }
        return genres;
    }

    @Override
    public Set<String> getAllAuthors() {
        Set<String> authors = new HashSet<>();
        List<Book> books = bookRepo.findAll();
        for (Book book : books) {
            String author = book.getAuthor();
            authors.add(author);
        }
        return authors;
    }

    @Override
    public Map<String, Map<String, Integer>> getUserStats(UserDTO userDTO) {
        Set<Book> userBooks = listBookUserNum(userDTO);
        Map<String, Map<String, Integer>> profil = new HashMap<>();
        Map<String, Integer> authorMap = new HashMap<>();
        Map<String, Integer> genreMap = new HashMap<>();

        for (Book book : userBooks) {
            String author = book.getAuthor();
            String genre = book.getGenre();
            authorMap.put(author, authorMap.getOrDefault(author, 0) + 1);
            genreMap.put(genre, genreMap.getOrDefault(genre, 0) + 1);
        }

        profil.put("authors", authorMap);
        profil.put("genres", genreMap);
        return profil;
    }

}
