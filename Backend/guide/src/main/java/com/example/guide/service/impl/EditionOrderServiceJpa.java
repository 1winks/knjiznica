package com.example.guide.service.impl;

import com.example.guide.domain.*;
import com.example.guide.repository.EditionOrderRepository;
import com.example.guide.repository.EditionRepository;
import com.example.guide.repository.OrderRepository;
import com.example.guide.service.EditionOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EditionOrderServiceJpa implements EditionOrderService {
    @Autowired
    private EditionOrderRepository editionOrderRepo;

    @Autowired
    private OrderRepository orderRepo;

    @Autowired
    private EditionRepository editionRepo;

    @Override
    public List<Edition> getEditionForOrder(Long orderId) {
        Order order = orderRepo.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Book not found with ID: " + orderId));
        List<EditionOrder> radnaLista = editionOrderRepo.findAllByOrder(order);
        List<Edition> listaEditiona = new ArrayList<>();
        for (EditionOrder editionOrder:radnaLista) {
            Long editionId = editionOrder.getEdition().getId();
            Edition edition = editionRepo.findById(editionId)
                    .orElseThrow(() -> new RuntimeException("Edition not found with ID: " + editionId));
            listaEditiona.add(edition);
        }
        return listaEditiona;
    }
}
