package com.example.guide.service;

import com.example.guide.domain.Book;
import com.example.guide.domain.Edition;
import com.example.guide.dto.EditionDTO;

import java.util.List;

public interface EditionService {
    List<Edition> listAll();

    Edition createEdition(EditionDTO editionDTO);

    Edition getEditionById(Long editionId);

    Edition updateEdition(Long editionId, EditionDTO editionDTO);

    void deleteEdition(Long editionId);
}
