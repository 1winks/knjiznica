package com.example.guide.service;

import com.example.guide.domain.Order;
import com.example.guide.dto.OrderDTO;
import com.example.guide.dto.OrderDTO2;

import java.util.List;

public interface OrderService {
    List<OrderDTO2> listAll();

    Order getOrderById(Long orderId);

    Order createOrder(OrderDTO orderDTO);

    Order updateOrder(Long orderId, OrderDTO orderDTO);

    void deleteOrder(Long orderId);
}
