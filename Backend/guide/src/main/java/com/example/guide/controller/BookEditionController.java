package com.example.guide.controller;

import com.example.guide.domain.Edition;
import com.example.guide.service.BookEditionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/resources/bookEditions")
public class BookEditionController {
    @Autowired
    private BookEditionService bookEditionService;

    @GetMapping("/editions/{bookId}")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public List<Edition> getEditionForBook(@PathVariable Long bookId) {
        return bookEditionService.getEditionForBook(bookId);
    }
}
