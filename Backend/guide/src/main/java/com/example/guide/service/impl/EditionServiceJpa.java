package com.example.guide.service.impl;

import com.example.guide.controller.responses.BookDeletionException;
import com.example.guide.controller.responses.EditionDeletionException;
import com.example.guide.domain.Book;
import com.example.guide.domain.BookEdition;
import com.example.guide.domain.Edition;
import com.example.guide.domain.EditionOrder;
import com.example.guide.dto.EditionDTO;
import com.example.guide.dto.EditionDTO2;
import com.example.guide.repository.BookEditionRepository;
import com.example.guide.repository.BookRepository;
import com.example.guide.repository.EditionOrderRepository;
import com.example.guide.repository.EditionRepository;
import com.example.guide.service.EditionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class EditionServiceJpa implements EditionService {
    @Autowired
    private EditionRepository editionRepo;

    @Autowired
    private BookRepository bookRepo;

    @Autowired
    private BookEditionRepository bookEditionRepo;

    @Autowired
    private EditionOrderRepository editionOrderRepo;

    @Override
    public List<Edition> listAll() {
        return editionRepo.findAll();
    }

    @Override
    public List<EditionDTO2> listAllAvailable() {
        List<Edition> editions = editionRepo.findEditionsByAvailableTrue();
        List<EditionDTO2> editionDTOs = new ArrayList<>();
        for (Edition edition : editions) {
            EditionDTO2 editionDTO = new EditionDTO2();
            editionDTO.setEditionId(edition.getId());
            editionDTO.setIsbn(edition.getIsbn());
            BookEdition bookEdition = bookEditionRepo.findByEdition(edition);
            editionDTO.setBookName(bookEdition.getBook().getTitle());
            editionDTO.setBookAuthor(bookEdition.getBook().getAuthor());
            editionDTOs.add(editionDTO);
        }
        return editionDTOs;
    }

    @Override
    public List<EditionDTO2> listByIds(Set<Long> ids) {
        List<Edition> editions = editionRepo.findAllById(ids);
        List<EditionDTO2> editionDTOs = new ArrayList<>();
        for (Edition edition : editions) {
            EditionDTO2 editionDTO = new EditionDTO2();
            editionDTO.setEditionId(edition.getId());
            editionDTO.setIsbn(edition.getIsbn());
            BookEdition bookEdition = bookEditionRepo.findByEdition(edition);
            editionDTO.setBookName(bookEdition.getBook().getTitle());
            editionDTO.setBookAuthor(bookEdition.getBook().getAuthor());
            editionDTOs.add(editionDTO);
        }
        return editionDTOs;
    }

    @Override
    public Edition getEditionById(Long editionId) {
        return editionRepo.findById(editionId)
                .orElseThrow(() -> new RuntimeException("Book not found with ID: " + editionId));
    }

    @Override
    public Edition createEdition(EditionDTO editionDTO) {
        Edition edition = new Edition();
        edition.setAvailable(editionDTO.getAvailable());
        edition.setIsbn(editionDTO.getIsbn());
        LocalDate borrowDate = editionDTO.getBorrowDate();
        LocalDate returnDate = editionDTO.getReturnDate();
        edition.setBorrowDate(borrowDate);
        edition.setReturnDate(returnDate);
        editionRepo.save(edition);

        Long bookId = editionDTO.getBookId();
        Book book = bookRepo.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found with ID: " + bookId));
        BookEdition bookEdition = new BookEdition();
        bookEdition.setBook(book);
        bookEdition.setEdition(edition);
        bookEditionRepo.save(bookEdition);
        return edition;
    }

    @Override
    public Edition updateEdition(Long editionId, EditionDTO editionDTO) {
        Edition edition = editionRepo.findById(editionId)
                .orElseThrow(() -> new RuntimeException("Edition not found with ID: " + editionId));
        edition.setAvailable(editionDTO.getAvailable());
        edition.setIsbn(editionDTO.getIsbn());
        edition.setBorrowDate(editionDTO.getBorrowDate());
        edition.setReturnDate(editionDTO.getReturnDate());
        editionRepo.save(edition);
        return edition;
    }

    @Override
    public void deleteEdition(Long editionId) {
        Edition edition = editionRepo.findById(editionId)
                .orElseThrow(() -> new RuntimeException("Edition not found with ID: " + editionId));
        List<EditionOrder> editionOrders = editionOrderRepo.findAllByEdition(edition);
        if (!editionOrders.isEmpty()) {
            throw new EditionDeletionException("Cant delete ordered editions!");
        }
        BookEdition bookEdition = bookEditionRepo.findByEdition(edition);
        if (bookEdition != null) {
            bookEditionRepo.delete(bookEdition);
        }
        editionRepo.delete(edition);
    }
}
