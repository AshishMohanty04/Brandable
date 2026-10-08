package com.nutritva.backend.repository;

import com.nutritva.backend.model.Order;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Repository
public class OrderRepository {

    private final Map<String, Order> orders = new ConcurrentHashMap<>();

    public Order save(Order order) {
        orders.put(order.getOrderId(), order);
        return order;
    }

    public Optional<Order> findById(String orderId) {
        return Optional.ofNullable(orders.get(orderId));
    }

    public List<Order> findAll() {
        return new ArrayList<>(orders.values());
    }

    public boolean updateStatus(String orderId, String newStatus, String message) {
        Order order = orders.get(orderId);
        if (order != null) {
            order.setOrderStatus(newStatus);
            if (message != null) {
                order.setTrackingMessage(message);
            }
            return true;
        }
        return false;
    }
}
