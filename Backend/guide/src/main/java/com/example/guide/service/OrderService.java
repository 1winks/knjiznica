package com.example.guide.service;

import com.example.guide.domain.Order;
import com.example.guide.dto.OrderDTO;
import com.example.guide.dto.OrderDTO2;
import com.example.guide.dto.OrderDTO3;

import java.util.List;

public interface OrderService {
    List<OrderDTO2> listAll();

    Order getOrderById(Long orderId);

    Order createOrder(OrderDTO3 orderDTO);

    Order updateOrder(Long orderId, OrderDTO orderDTO);

    void deleteOrder(Long orderId);
}
