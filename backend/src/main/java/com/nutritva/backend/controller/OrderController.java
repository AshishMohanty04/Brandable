package com.nutritva.backend.controller;

import com.nutritva.backend.model.ApiResponse;
import com.nutritva.backend.model.Order;
import com.nutritva.backend.model.OrderRequest;
import com.nutritva.backend.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Order>> createOrder(@RequestBody OrderRequest request) {
        if (request.getItems() == null || request.getItems().isEmpty()) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Cart is empty. Please add items to proceed."));
        }
        Order created = orderService.createOrder(request);
        return ResponseEntity.ok(ApiResponse.ok("Order placed successfully! Delivery in 10 minutes.", created));
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<ApiResponse<Order>> getOrderById(@PathVariable String orderId) {
        return orderService.getOrderById(orderId)
                .map(o -> ResponseEntity.ok(ApiResponse.ok("Order found", o)))
                .orElse(ResponseEntity.status(404).body(ApiResponse.error("Order " + orderId + " not found")));
    }

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }
}
