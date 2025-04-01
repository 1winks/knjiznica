package com.example.guide.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookDTO2 {
    private String title;
    private String author;
    private String genre;
    private Long popularity;
    private Boolean available;
    private List<EditionDTO3> editionISBNS;
}
