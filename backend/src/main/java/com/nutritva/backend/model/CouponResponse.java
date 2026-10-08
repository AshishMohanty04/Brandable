package com.nutritva.backend.model;

public class CouponResponse {
    private boolean valid;
    private String code;
    private int discountAmount;
    private int discountPercentage;
    private String message;

    public CouponResponse() {}

    public CouponResponse(boolean valid, String code, int discountAmount, int discountPercentage, String message) {
        this.valid = valid;
        this.code = code;
        this.discountAmount = discountAmount;
        this.discountPercentage = discountPercentage;
        this.message = message;
    }

    public boolean isValid() { return valid; }
    public void setValid(boolean valid) { this.valid = valid; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public int getDiscountAmount() { return discountAmount; }
    public void setDiscountAmount(int discountAmount) { this.discountAmount = discountAmount; }

    public int getDiscountPercentage() { return discountPercentage; }
    public void setDiscountPercentage(int discountPercentage) { this.discountPercentage = discountPercentage; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
