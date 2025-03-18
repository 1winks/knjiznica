package com.example.guide.service;

import com.example.guide.domain.Reader;
import com.example.guide.dto.ReaderDTO;
import com.example.guide.dto.ReadersResponse;

import java.util.List;

public interface ReaderService {
    List<ReadersResponse> listAll();

    Reader getReaderById(Long readerId);

    Reader getReaderByUserId(Long userId);

    Reader updateReader(Long id, ReaderDTO readerDTO);
}
