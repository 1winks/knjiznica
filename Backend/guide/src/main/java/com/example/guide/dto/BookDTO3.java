package com.example.guide.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookDTO3 {
    private String title;
    private String author;
    private String genre;
    private Long isbn;
}
