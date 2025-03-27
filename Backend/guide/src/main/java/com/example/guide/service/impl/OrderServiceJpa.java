package com.example.guide.service.impl;

import com.example.guide.authentication.models.User;
import com.example.guide.authentication.repository.UserRepository;
import com.example.guide.domain.*;
import com.example.guide.dto.OrderDTO;
import com.example.guide.dto.OrderDTO2;
import com.example.guide.dto.OrderDTO3;
import com.example.guide.repository.*;
import com.example.guide.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class OrderServiceJpa implements OrderService {
    @Autowired
    private OrderRepository orderRepo;

    @Autowired
    private ReaderRepository readerRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private EditionRepository editionRepo;

    @Autowired
    private EditionOrderRepository editionOrderRepo;

    @Autowired
    private OrderReaderRepository orderReaderRepo;

    @Override
    public List<OrderDTO2> listAll() {
        List<Order> orders = orderRepo.findAll();
        List<OrderDTO2> orderDTOs = new ArrayList<>();
        for (Order order : orders) {
            OrderDTO2 orderDTO = new OrderDTO2();
            orderDTO.setStartDate(order.getStartDate());
            orderDTO.setEndDate(order.getEndDate());
            orderDTO.setReturnedDate(order.getReturnedDate());
            orderDTO.setOrderId(order.getId());

            OrderReader orderReader = orderReaderRepo.findByOrder(order);
            Reader reader = orderReader.getReader();
            orderDTO.setReaderId(reader.getId());
            orderDTO.setUsername(reader.getUser().getUsername());

            Set<Long> editionsIds = new HashSet<>();
            List<EditionOrder> editionOrders = editionOrderRepo.findAllByOrder(order);
            for (EditionOrder editionOrder : editionOrders) {
                editionsIds.add(editionOrder.getEdition().getId());
            }
            orderDTO.setIzdanjaId(editionsIds);

            orderDTOs.add(orderDTO);
        }
        return orderDTOs;
    }

    @Override
    public Order getOrderById(Long orderId) {
        return orderRepo.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Book not found with ID: " + orderId));
    }

    @Override
    public Order createOrder(OrderDTO3 orderDTO) {
        Order order = new Order();
        order.setStartDate(orderDTO.getStartDate());
        order.setEndDate(orderDTO.getEndDate());
        order.setReturnedDate(orderDTO.getReturnedDate());
        orderRepo.save(order);

        String username = orderDTO.getUsername();
        Optional<User> user = Optional.ofNullable(userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found with username: " + username)));
        Reader reader = readerRepo.findReaderByUserId(user.get().getId());
        OrderReader orderReader = new OrderReader();
        orderReader.setOrder(order);
        orderReader.setReader(reader);
        orderReaderRepo.save(orderReader);

        Set<Long> izdanjaIds = orderDTO.getIzdanjaId();
        for (Long id : izdanjaIds) {
            Edition edition = editionRepo.findById(id)
                    .orElseThrow(() -> new RuntimeException("Reader not found with ID: " + id));
            EditionOrder editionOrder = new EditionOrder();
            editionOrder.setEdition(edition);
            editionOrder.setOrder(order);
            editionOrderRepo.save(editionOrder);

            edition.setAvailable(false);
            edition.setBorrowDate(orderDTO.getStartDate());
            edition.setReturnDate(orderDTO.getEndDate());
            editionRepo.save(edition);
        }
        return order;
    }

    @Override
    public Order updateOrder(Long orderId, OrderDTO orderDTO) {
        Order order = orderRepo.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Book not found with ID: " + orderId));
        order.setReturnedDate(orderDTO.getReturnedDate());
        return orderRepo.save(order);
    }

    @Override
    public void deleteOrder(Long orderId) {
        Order order = orderRepo.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Book not found with ID: " + orderId));
        List<EditionOrder> editionOrders = editionOrderRepo.findAllByOrder(order);
        if (!editionOrders.isEmpty()) {
            editionOrderRepo.deleteAll(editionOrders);
        }
        OrderReader orderReader = orderReaderRepo.findByOrder(order);
        if (orderReader != null) {
            orderReaderRepo.delete(orderReader);
        }
        orderRepo.delete(order);
    }
}
