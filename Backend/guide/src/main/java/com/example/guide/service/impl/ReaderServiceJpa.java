package com.example.guide.service.impl;

import com.example.guide.domain.Reader;
import com.example.guide.dto.ReaderDTO;
import com.example.guide.dto.ReadersResponse;
import com.example.guide.repository.ReaderRepository;
import com.example.guide.service.ReaderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ReaderServiceJpa implements ReaderService {
    @Autowired
    private ReaderRepository readerRepo;
    @Override
    public List<ReadersResponse> listAll() {
        List<Reader> readers = readerRepo.findAll();
        List<ReadersResponse> responseList = new ArrayList<>();
        for (Reader reader : readers) {
            ReadersResponse response = new ReadersResponse();
            response.setReaderId(reader.getId());
            response.setUsername(reader.getUser().getUsername());
            response.setEmail(reader.getUser().getEmail());
            response.setAddress(reader.getAddress());
            response.setPhoneNumber(reader.getPhoneNumber());
            responseList.add(response);
        }
        return responseList;
    }

    @Override
    public Reader getReaderById(Long readerId) {
        return readerRepo.findById(readerId)
                .orElseThrow(() -> new RuntimeException("Book not found with ID: " + readerId));
    }

    @Override
    public Reader getReaderByUserId(Long userId) {
        if (readerRepo.existsByUserId(userId)) {
            throw new RuntimeException("Reader doesnt exist for user");
        }
        return readerRepo.findReaderByUserId(userId);
    }

    @Override
    public Reader updateReader(Long id, ReaderDTO readerDTO) {
        Reader reader = readerRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Reader not found with ID: " + id));
        reader.setAddress(readerDTO.getAddress());
        reader.setPhoneNumber(readerDTO.getPhoneNumber());
        return readerRepo.save(reader);
    }
}
