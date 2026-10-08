package com.nutritva.backend.model;

public class CouponRequest {
    private String code;
    private int cartSubtotal;

    public CouponRequest() {}

    public CouponRequest(String code, int cartSubtotal) {
        this.code = code;
        this.cartSubtotal = cartSubtotal;
    }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public int getCartSubtotal() { return cartSubtotal; }
    public void setCartSubtotal(int cartSubtotal) { this.cartSubtotal = cartSubtotal; }
}
