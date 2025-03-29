package com.example.guide.service;

import com.example.guide.domain.Order;
import com.example.guide.dto.*;

import java.util.List;

public interface OrderService {
    List<OrderDTO2> listAll();

    Order getOrderById(Long orderId);

    Order createOrder(OrderDTO3 orderDTO);

    Order updateOrder(Long orderId, OrderDTO3 orderDTO);

    void deleteOrder(Long orderId);

    List<OrderDTO4> listAllUser(UserDTO userDTO);
}
