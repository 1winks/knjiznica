package com.example.guide.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EditionDTO2 {
    private Long editionId;
    private Long isbn;
    private String bookName;
    private String bookAuthor;
}
