package com.nutritva.backend.service;

import com.nutritva.backend.model.CouponResponse;
import org.springframework.stereotype.Service;

@Service
public class CouponService {

    public CouponResponse validateCoupon(String code, int subtotal) {
        if (code == null || code.trim().isEmpty()) {
            return new CouponResponse(false, "", 0, 0, "No coupon code provided");
        }

        String cleanCode = code.trim().toUpperCase();

        switch (cleanCode) {
            case "BLINK15":
            case "FRESH15": {
                int discount = (int) Math.round(subtotal * 0.15);
                return new CouponResponse(true, cleanCode, discount, 15, "15% off applied successfully!");
            }
            case "NUTRITVA20": {
                if (subtotal < 499) {
                    return new CouponResponse(false, cleanCode, 0, 0, "Coupon NUTRITVA20 requires minimum order value of ₹499");
                }
                int discount = (int) Math.round(subtotal * 0.20);
                return new CouponResponse(true, cleanCode, discount, 20, "Special 20% savings applied!");
            }
            case "FREEDEL": {
                return new CouponResponse(true, cleanCode, 25, 0, "Free delivery applied on your order!");
            }
            case "WELCOME50": {
                if (subtotal < 299) {
                    return new CouponResponse(false, cleanCode, 0, 0, "WELCOME50 requires minimum order value of ₹299");
                }
                return new CouponResponse(true, cleanCode, 50, 0, "Flat ₹50 welcome discount applied!");
            }
            default:
                return new CouponResponse(false, cleanCode, 0, 0, "Invalid coupon code. Try BLINK15 for 15% off.");
        }
    }
}
