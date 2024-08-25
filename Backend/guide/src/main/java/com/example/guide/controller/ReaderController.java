package com.example.guide.controller;
import com.example.guide.domain.Reader;
import com.example.guide.dto.ReaderDTO;
import com.example.guide.service.ReaderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/resources/readers")
public class ReaderController {
    @Autowired
    private ReaderService readerService;

    @GetMapping("")
    @PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
    public List<Reader> listReaders(){
        return readerService.listAll();
    }

    @GetMapping("/{readerId}")
    @PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
    public Reader findReader(@PathVariable Long readerId){
        return readerService.getReaderById(readerId);
    }

    @GetMapping("/userReader/{userId}")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public Reader findReaderByUser(@PathVariable Long userId){
        return readerService.getReaderByUserId(userId);
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public Reader updateReader(@PathVariable Long id, @RequestBody ReaderDTO readerDTO) {
        return readerService.updateReader(id, readerDTO);
    }

}
