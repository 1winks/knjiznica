package com.example.guide.recommender;

import com.example.guide.dto.UserDTO;
import com.example.guide.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@Component
public class UserCalc {

    @Autowired
    private BookService bookService;

    public Map<String, Map<String, Double>> encode(UserDTO userDTO) {
        Set<String> genres = bookService.getAllGenres();
        Set<String> authors = bookService.getAllAuthors();
        Map<String, Map<String, Integer>> userInfo = bookService.getUserStats(userDTO);
        Map<String, Integer> userGenres = userInfo.get("genres");
        Map<String, Integer> userAuthors = userInfo.get("authors");
        int sumGenres = userGenres.values().stream()
                .mapToInt(Integer::intValue)
                .sum();
        int sumAuthors = userAuthors.values().stream()
                .mapToInt(Integer::intValue)
                .sum();
        Map<String, Double> genreScores = new HashMap<>();
        Map<String, Double> authorScores = new HashMap<>();
        for (String genre : genres) {
            genreScores.put(genre,
                    ((double) userGenres.getOrDefault(genre, 0))/sumGenres);
        }
        for (String author : authors) {
            authorScores.put(author,
                    ((double) userAuthors.getOrDefault(author, 0))/sumAuthors);
        }
        Map<String, Map<String, Double>> userScores = new HashMap<>();
        userScores.put("genreScores", genreScores);
        userScores.put("authorScores", authorScores);
        return userScores;
    }
}
