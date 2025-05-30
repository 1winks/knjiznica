package com.example.guide.controller;
import com.example.guide.domain.Book;
import com.example.guide.domain.Order;
import com.example.guide.dto.*;
import com.example.guide.service.BookService;
import com.example.guide.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/resources/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping("")
    @PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
    public List<OrderDTO2> listOrder(){
        return orderService.listAll();
    }

    @PostMapping("orderuser")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public List<OrderDTO4> listOrderUser(@RequestBody UserDTO userDTO){
        return orderService.listAllUser(userDTO);
    }

    @GetMapping("/{orderId}")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public Order findOrder(@PathVariable Long orderId){
        return orderService.getOrderById(orderId);
    }

    @PostMapping("/add")
    @PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
    public Order createOrder(@RequestBody OrderDTO3 orderDTO) {
        return orderService.createOrder(orderDTO);
    }

    @PutMapping("/update/{orderId}")
    @PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
    public Order updateOrder(@PathVariable Long orderId, @RequestBody OrderDTO3 orderDTO) {
        return orderService.updateOrder(orderId, orderDTO);
    }

    @DeleteMapping("/delete/{orderId}")
    @PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
    public void deleteOrder(@PathVariable Long orderId) {
        orderService.deleteOrder(orderId);
    }
}
