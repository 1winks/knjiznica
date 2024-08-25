package com.example.guide.service;

import com.example.guide.domain.Reader;
import com.example.guide.dto.ReaderDTO;

import java.util.List;

public interface ReaderService {
    List<Reader> listAll();

    Reader getReaderById(Long readerId);

    Reader getReaderByUserId(Long userId);

    Reader updateReader(Long id, ReaderDTO readerDTO);
}
