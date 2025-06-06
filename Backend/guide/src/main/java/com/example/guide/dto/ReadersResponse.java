package com.example.guide.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Setter
@Getter
@AllArgsConstructor
public class ReadersResponse {
    private Long readerId;
    private String username;
    private String email;
    private String address;
    private String phoneNumber;
    private LocalDate membershipFeeExpiry;

    public ReadersResponse() {
    }
}
