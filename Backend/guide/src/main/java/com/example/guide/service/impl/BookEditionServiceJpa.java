package com.example.guide.service.impl;

import com.example.guide.domain.Book;
import com.example.guide.domain.BookEdition;
import com.example.guide.domain.Edition;
import com.example.guide.repository.BookEditionRepository;
import com.example.guide.repository.BookRepository;
import com.example.guide.repository.EditionRepository;
import com.example.guide.service.BookEditionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookEditionServiceJpa implements BookEditionService {
    @Autowired
    private BookEditionRepository bookEditionRepo;

    @Autowired
    private BookRepository bookRepo;

    @Autowired
    private EditionRepository editionRepo;

    @Override
    public List<Edition> getEditionForBook(Long bookId) {
        Book book = bookRepo.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found with ID: " + bookId));
        List<BookEdition> radnaLista = bookEditionRepo.findAllByBook(book);
        List<Edition> listaEditiona = new ArrayList<>();
        for (BookEdition bookEdition:radnaLista) {
            Long editionId = bookEdition.getEdition().getId();
            Edition edition = editionRepo.findById(editionId)
                    .orElseThrow(() -> new RuntimeException("Edition not found with ID: " + editionId));
            listaEditiona.add(edition);
        }
        return listaEditiona;
    }

    @Override
    public BookEdition createBookEdition(Book book, Edition edition) {
        BookEdition bookEdition = new BookEdition();
        bookEdition.setEdition(edition);
        bookEdition.setBook(book);
        return bookEditionRepo.save(bookEdition);
    }
}
