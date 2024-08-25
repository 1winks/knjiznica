package com.example.guide.service.impl;

import com.example.guide.domain.Order;
import com.example.guide.dto.OrderDTO;
import com.example.guide.repository.OrderRepository;
import com.example.guide.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceJpa implements OrderService {
    @Autowired
    private OrderRepository orderRepo;

    @Override
    public List<Order> listAll() {
        return orderRepo.findAll();
    }

    @Override
    public Order getOrderById(Long orderId) {
        return orderRepo.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Book not found with ID: " + orderId));
    }

    @Override
    public Order createOrder(OrderDTO orderDTO) {
        Order order = new Order();
        order.setStartDate(orderDTO.getStartDate());
        order.setEndDate(orderDTO.getEndDate());
        order.setReturnedDate(orderDTO.getReturnedDate());
        return orderRepo.save(order);
    }

    @Override
    public Order updateOrder(Long orderId, OrderDTO orderDTO) {
        Order order = orderRepo.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Book not found with ID: " + orderId));
        order.setStartDate(orderDTO.getStartDate());
        order.setEndDate(orderDTO.getEndDate());
        order.setReturnedDate(orderDTO.getReturnedDate());
        return orderRepo.save(order);
    }

    @Override
    public void deleteOrder(Long orderId) {
        Order order = orderRepo.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Book not found with ID: " + orderId));
        orderRepo.delete(order);
    }
}
