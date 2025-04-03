package com.example.guide.service;

import com.example.guide.domain.Book;
import com.example.guide.dto.*;

import java.util.List;
import java.util.Map;
import java.util.Set;

public interface BookService {
    List<Book> listAll();

    Book createBook(BookDTO bookDTO);

    Book getBookById(Long bookId);

    Book updateBook(Long bookId, BookDTO bookDTO);

    void deleteBook(Long bookId);

    List<BookDTO2> listBookEds();

    List<BookDTO3> listBookUser(UserDTO userDTO);

    List<BookDTO4> listPopular();

    Set<Book> listBookUserNum(UserDTO userDTO);

    Set<String> getAllGenres();

    Set<String> getAllAuthors();

    Map<String, Map<String, Integer>> getUserStats(UserDTO userDTO);

}
