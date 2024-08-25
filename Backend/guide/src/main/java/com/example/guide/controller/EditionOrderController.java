package com.example.guide.controller;

import com.example.guide.domain.Edition;
import com.example.guide.service.EditionOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/resources/editionOrders")
public class EditionOrderController {
    @Autowired
    private EditionOrderService editionOrderService;

    @GetMapping("/editions/{orderId}")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public List<Edition> getEditionForOrder(@PathVariable Long orderId) {
        return editionOrderService.getEditionForOrder(orderId);
    }
}
