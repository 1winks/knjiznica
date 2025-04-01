package com.example.guide.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
@AllArgsConstructor
public class ReadersResponse2 {
    private String username;
    private LocalDate membershipFeeExpiry;

    public ReadersResponse2() {
    }
}
