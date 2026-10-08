package com.nutritva.backend.controller;

import com.nutritva.backend.service.OrderService;
import com.nutritva.backend.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class ApiController {

    private final ProductService productService;
    private final OrderService orderService;

    public ApiController(ProductService productService, OrderService orderService) {
        this.productService = productService;
        this.orderService = orderService;
    }

    @GetMapping("/hello")
    public ResponseEntity<Map<String, Object>> hello() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Nutritva Quick-Commerce Backend API is UP & RUNNING");
        response.put("status", "UP");
        response.put("timestamp", LocalDateTime.now().toString());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalProducts", productService.getProducts("ALL", null).size());
        stats.put("totalCategories", productService.getCategories().size());
        stats.put("totalOrdersPlaced", orderService.getAllOrders().size());
        stats.put("deliveryGuaranteeMinutes", 10);
        stats.put("purityGuarantee", "100% Whole & Preservative-Free");
        stats.put("timestamp", LocalDateTime.now().toString());
        return ResponseEntity.ok(stats);
    }
}
