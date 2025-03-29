package com.example.guide.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderDTO4 {
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalDate returnedDate;
    private Set<BookDTO3> izdanja;
}
