package com.example.guide.service;

import com.example.guide.authentication.models.User;
import com.example.guide.domain.Reader;
import com.example.guide.dto.DateDTO;
import com.example.guide.dto.ReaderDTO;
import com.example.guide.dto.ReadersResponse;
import com.example.guide.dto.ReadersResponse2;

import java.util.List;

public interface ReaderService {
    List<ReadersResponse> listAll();

    Reader getReaderById(Long readerId);

    Reader getReaderByUserId(Long userId);

    Reader updateReader(Long id, ReaderDTO readerDTO);

    Reader renewReader(Long id, DateDTO dateDTO);

    List<ReadersResponse2> listActive();

    void deleteReader(User user);
}
