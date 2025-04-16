package com.example.guide.controller.responses;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class BookDeletionException extends RuntimeException {
    public BookDeletionException(String message) {
        super(message);
    }
}
