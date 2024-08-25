package com.example.guide.service;

import com.example.guide.domain.Order;

import java.util.List;

public interface OrderReaderService {
    List<Order> getOrderForReader(Long readerId);

    List<Order> getOrderForUser(Long userId);
}
