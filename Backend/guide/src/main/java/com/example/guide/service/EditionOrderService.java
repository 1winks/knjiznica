package com.example.guide.service;

import com.example.guide.domain.Edition;

import java.util.List;

public interface EditionOrderService {

    List<Edition> getEditionForOrder(Long orderId);
}
