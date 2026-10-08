package com.nutritva.backend.controller;

import com.nutritva.backend.model.CouponRequest;
import com.nutritva.backend.model.CouponResponse;
import com.nutritva.backend.service.CouponService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/coupons")
@CrossOrigin
public class CouponController {

    private final CouponService couponService;

    public CouponController(CouponService couponService) {
        this.couponService = couponService;
    }

    @PostMapping("/validate")
    public ResponseEntity<CouponResponse> validateCoupon(@RequestBody CouponRequest request) {
        CouponResponse response = couponService.validateCoupon(request.getCode(), request.getCartSubtotal());
        return ResponseEntity.ok(response);
    }
}
