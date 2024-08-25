package com.example.guide.service.impl;

import com.example.guide.domain.*;
import com.example.guide.repository.OrderReaderRepository;
import com.example.guide.service.OrderReaderService;
import com.example.guide.service.OrderService;
import com.example.guide.service.ReaderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderReaderServiceJpa implements OrderReaderService {
    @Autowired
    private OrderReaderRepository orderReaderRepo;

    @Autowired
    private OrderService orderService;

    @Autowired
    private ReaderService readerService;

    @Override
    public List<Order> getOrderForReader(Long readerId) {
        Reader reader = readerService.getReaderById(readerId);
        return getOrders(reader);
    }

    @Override
    public List<Order> getOrderForUser(Long userId) {
        Reader reader = readerService.getReaderByUserId(userId);
        return getOrders(reader);
    }

    private List<Order> getOrders(Reader reader) {
        List<OrderReader> radnaLista = orderReaderRepo.findAllByReader(reader);
        List<Order> narudzbe = new ArrayList<>();
        for (OrderReader orderReader:radnaLista) {
            Long orderId = orderReader.getOrder().getId();
            Order order = orderService.getOrderById(orderId);
            narudzbe.add(order);
        }
        return narudzbe;
    }
}
