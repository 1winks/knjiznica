package com.example.guide.controller;

import com.example.guide.domain.Book;
import com.example.guide.dto.*;
import com.example.guide.recommender.BookCalc;
import com.example.guide.recommender.Recommend;
import com.example.guide.recommender.UserCalc;
import com.example.guide.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@CrossOrigin
@RequestMapping("/api/resources/books")
public class BookController {
    @Autowired
    private BookService bookService;

    @Autowired
    private Recommend recommend;

    @GetMapping("")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public List<Book> listBooks(){
        return bookService.listAll();
    }

    @GetMapping("/bookeds")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public List<BookDTO2> listBookEditions(){
        return bookService.listBookEds();
    }

    @GetMapping("/popular")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public List<BookDTO4> listPopular(){
        return bookService.listPopular();
    }

    @PostMapping("/bookuser")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public List<BookDTO3> listBooksUser(@RequestBody UserDTO userDTO){
        return bookService.listBookUser(userDTO);
    }

    @PostMapping("/numread")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public Set<Book> listBooksUserNum(@RequestBody UserDTO userDTO){
        return bookService.listBookUserNum(userDTO);
    }

    @GetMapping("/{bookId}")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public Book findBook(@PathVariable Long bookId){
        return bookService.getBookById(bookId);
    }

    @PostMapping("/add")
    @PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
    public Book createBook(@RequestBody BookDTO bookDTO) {
        return bookService.createBook(bookDTO);
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
    public Book updateBook(@PathVariable Long id, @RequestBody BookDTO bookDTO) {
        return bookService.updateBook(id, bookDTO);
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
    public void deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
    }

    @GetMapping("/authors")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public Set<String> listAuthors(){
        return bookService.getAllAuthors();
    }

    @GetMapping("/genres")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public Set<String> listGenres(){
        return bookService.getAllGenres();
    }

    @PostMapping("/recommendprofile")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public Map<String, Map<String, Integer>> listStats(@RequestBody UserDTO userDTO){
        System.out.println();
        return bookService.getUserStats(userDTO);
    }

    @PostMapping("/recommend")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public List<BookDTO4> topRecommends(@RequestBody UserDTO userDTO){
        return recommend.recommend(userDTO);
    }

}
