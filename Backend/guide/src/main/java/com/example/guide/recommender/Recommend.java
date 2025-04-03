package com.example.guide.recommender;

import com.example.guide.domain.Book;
import com.example.guide.dto.BookDTO4;
import com.example.guide.dto.UserDTO;
import com.example.guide.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class Recommend {
    @Autowired
    private BookService bookService;

    @Autowired
    private BookCalc bookCalc;

    public List<BookDTO4> recommend(UserDTO userDTO) {
        List<BookDTO4> userRecommend = new ArrayList<>();
        Map<Book, Double> bookScores = bookCalc.encode(userDTO);
        Set<Book> readBooks = bookService.listBookUserNum(userDTO);
        Map<Book, Double> recommended = new HashMap<>();
        for (Map.Entry<Book, Double> entry : bookScores.entrySet()) {
            Book book = entry.getKey();
            Double score = entry.getValue();
            if (!readBooks.contains(book)) {
                recommended.put(book, score);
            }
        }
        List<Map.Entry<Book, Double>> sortedRecommended = new ArrayList<>(recommended.entrySet());
        sortedRecommended.sort((entry1, entry2) -> entry2.getValue().compareTo(entry1.getValue()));
        int limit = Math.min(3, sortedRecommended.size());
        for (int i = 0; i < limit; i++) {
            Map.Entry<Book, Double> entry = sortedRecommended.get(i);
            Book book = entry.getKey();
            Double score = entry.getValue();
            BookDTO4 bookDTO = new BookDTO4();
            bookDTO.setTitle(book.getTitle());
            bookDTO.setAuthor(book.getAuthor());
            bookDTO.setGenre(book.getGenre());
            bookDTO.setPopularity(String.valueOf(book.getPopularity()));
            userRecommend.add(bookDTO);
        }
        return userRecommend;
    }
}
