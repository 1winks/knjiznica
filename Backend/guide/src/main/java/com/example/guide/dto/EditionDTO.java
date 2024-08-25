package com.example.guide.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EditionDTO {
    private Long bookId;
    private Long isbn;
    private Boolean available;
    private LocalDate borrowDate;
    private LocalDate returnDate;
}
