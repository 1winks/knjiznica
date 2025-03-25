package com.example.guide.service;

import com.example.guide.domain.Book;
import com.example.guide.domain.Edition;
import com.example.guide.dto.EditionDTO;
import com.example.guide.dto.EditionDTO2;

import java.util.List;
import java.util.Set;

public interface EditionService {
    List<Edition> listAll();

    List<EditionDTO2> listByIds(Set<Long> ids);

    Edition createEdition(EditionDTO editionDTO);

    Edition getEditionById(Long editionId);

    Edition updateEdition(Long editionId, EditionDTO editionDTO);

    void deleteEdition(Long editionId);
}
