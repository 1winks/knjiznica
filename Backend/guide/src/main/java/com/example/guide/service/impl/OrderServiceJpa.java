package com.example.guide.service.impl;

import com.example.guide.authentication.models.User;
import com.example.guide.authentication.repository.UserRepository;
import com.example.guide.domain.*;
import com.example.guide.dto.*;
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
    private BookEditionRepository bookEditionRepo;

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
        String username = orderDTO.getUsername();
        Optional<User> user = Optional.ofNullable(userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found with username: " + username)));
        Reader reader = readerRepo.findReaderByUserId(user.get().getId());
        OrderReader orderReader = new OrderReader();
        orderReader.setOrder(order);
        orderReader.setReader(reader);
        orderRepo.save(order);
        orderReaderRepo.save(orderReader);

        Set<Long> izdanjaIds = orderDTO.getIzdanjaId();
        for (Long id : izdanjaIds) {
            Edition edition = editionRepo.findById(id)
                    .orElseThrow(() -> new RuntimeException("Edition not found with ID: " + id));
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
    public Order updateOrder(Long orderId, OrderDTO3 orderDTO) {
        Order order = orderRepo.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with ID: " + orderId));
        order.setReturnedDate(orderDTO.getReturnedDate());
        List<EditionOrder> editionOrders = editionOrderRepo.findAllByOrder(order);
        for (EditionOrder editionOrder : editionOrders) {
            Edition edition = editionOrder.getEdition();
            edition.setBorrowDate(null);
            edition.setReturnDate(null);
            edition.setAvailable(true);
            editionRepo.save(edition);
        }
        return orderRepo.save(order);
    }

    @Override
    public void deleteOrder(Long orderId) {
        Order order = orderRepo.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with ID: " + orderId));
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

    @Override
    public List<OrderDTO4> listAllUser(UserDTO userDTO) {
        String username = userDTO.getUsername();
        System.out.println(username);
        List<OrderDTO4> userOrders = new ArrayList<>();
        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException(
                        "User not found with username: " + username));
        Reader reader = user.getReader();
        List<OrderReader> readerOrders = orderReaderRepo.findAllByReader(reader);
        for (OrderReader orderReader : readerOrders) {
            OrderDTO4 orderDTO4 = new OrderDTO4();
            Set<BookDTO3> izdanja = new HashSet<>();
            Order order = orderReader.getOrder();
            List<EditionOrder> editionOrders = editionOrderRepo.findAllByOrder(order);
            for (EditionOrder editionOrder : editionOrders) {
                Edition edition = editionOrder.getEdition();
                BookEdition bookEdition = bookEditionRepo.findByEdition(edition);
                Book book = bookEdition.getBook();
                BookDTO3 bookDTO3 = new BookDTO3();
                bookDTO3.setTitle(book.getTitle());
                bookDTO3.setAuthor(book.getAuthor());
                bookDTO3.setGenre(book.getGenre());
                bookDTO3.setIsbn(edition.getIsbn());
                izdanja.add(bookDTO3);
            }
            orderDTO4.setStartDate(order.getStartDate());
            orderDTO4.setEndDate(order.getEndDate());
            orderDTO4.setReturnedDate(order.getReturnedDate());
            orderDTO4.setIzdanja(izdanja);
            userOrders.add(orderDTO4);
        }
        return userOrders;
    }
}
