package com.nutritva.backend.service;

import com.nutritva.backend.model.*;
import com.nutritva.backend.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final CouponService couponService;
    private final Random random = new Random();

    public OrderService(OrderRepository orderRepository, CouponService couponService) {
        this.orderRepository = orderRepository;
        this.couponService = couponService;
    }

    public Order createOrder(OrderRequest request) {
        String orderId = "NUT-" + (100000 + random.nextInt(900000));

        int subtotal = 0;
        if (request.getItems() != null) {
            for (OrderItem item : request.getItems()) {
                subtotal += item.getPrice() * item.getQuantity();
            }
        }

        int discountAmount = 0;
        if (request.getCouponCode() != null && !request.getCouponCode().trim().isEmpty()) {
            CouponResponse couponRes = couponService.validateCoupon(request.getCouponCode(), subtotal);
            if (couponRes.isValid()) {
                discountAmount = couponRes.getDiscountAmount();
            }
        }

        int shippingFee = (subtotal >= 299 || subtotal == 0) ? 0 : 25;
        int grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

        String paymentMethod = (request.getPaymentMethod() != null && !request.getPaymentMethod().trim().isEmpty())
                ? request.getPaymentMethod()
                : "UPI";
        String paymentStatus = paymentMethod.equalsIgnoreCase("COD") ? "PENDING" : "PAID";

        String now = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

        Order order = new Order(
                orderId,
                request.getItems(),
                request.getCustomerName() != null ? request.getCustomerName() : "Valued Customer",
                request.getCustomerPhone() != null ? request.getCustomerPhone() : "+91 98765 43210",
                request.getCustomerEmail() != null ? request.getCustomerEmail() : "customer@nutritva.com",
                request.getDeliveryAddress() != null ? request.getDeliveryAddress() : "Express Home Delivery (10 mins)",
                paymentMethod,
                paymentStatus,
                "CONFIRMED",
                subtotal,
                discountAmount,
                shippingFee,
                grandTotal,
                request.getCouponCode(),
                10,
                now,
                "Farm-fresh items picked & verified. Rider departing in 10 minutes."
        );

        return orderRepository.save(order);
    }

    public Optional<Order> getOrderById(String orderId) {
        return orderRepository.findById(orderId);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public boolean updateStatus(String orderId, String status, String message) {
        return orderRepository.updateStatus(orderId, status, message);
    }
}
