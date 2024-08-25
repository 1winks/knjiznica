package com.example.guide.service;

import com.example.guide.domain.Book;
import com.example.guide.domain.BookEdition;
import com.example.guide.domain.Edition;

import java.util.List;

public interface BookEditionService {
    List<Edition> getEditionForBook(Long bookId);

    BookEdition createBookEdition(Book book, Edition edition);
}
