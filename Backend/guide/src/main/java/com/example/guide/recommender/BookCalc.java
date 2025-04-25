package com.example.guide.recommender;

import com.example.guide.domain.Book;
import com.example.guide.dto.UserDTO;
import com.example.guide.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class BookCalc {
    @Autowired
    private UserCalc userCalc;

    @Autowired
    private BookService bookService;

    public Map<Book, Double> encode(UserDTO userDTO) {
        Map<Book, Double> bookScores = new HashMap<>();
        Map<String, Map<String, Double>> userScores = userCalc.encode(userDTO);
        List<Book> books = bookService.listAll();
        long sumPopularity = books.stream()
                .mapToLong(Book::getPopularity)
                .sum();
        for (Book book : books) {
            String genre = book.getGenre();
            String author = book.getAuthor();
            double popularity = ((double) book.getPopularity())/sumPopularity;
            Double userGenreScore = userScores.get("genreScores").get(genre);
            Double userAuthorScore = userScores.get("authorScores").get(author);
            Double score = popularity + userGenreScore + userAuthorScore;
            bookScores.put(book, score);
        }
        return bookScores;
    }
}
