package com.example.guide.controller;
import com.example.guide.domain.Edition;
import com.example.guide.domain.Order;
import com.example.guide.service.EditionOrderService;
import com.example.guide.service.OrderReaderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/resources/orderReaders")
public class OrderReaderController {
    @Autowired
    private OrderReaderService orderReaderService;

    @GetMapping("/orders/reader/{readerId}")
    @PreAuthorize("hasRole('MODERATOR') or hasRole('ADMIN')")
    public List<Order> getOrderForReader(@PathVariable Long readerId) {
        return orderReaderService.getOrderForReader(readerId);
    }

    @GetMapping("/orders/user/{userId}")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public List<Order> getOrderForUser(@PathVariable Long userId) {
        return orderReaderService.getOrderForUser(userId);
    }
}
