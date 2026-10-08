package com.nutritva.backend.model;

public class ProductWeightOption {
    private String weight;
    private int price;
    private int originalPrice;

    public ProductWeightOption() {}

    public ProductWeightOption(String weight, int price, int originalPrice) {
        this.weight = weight;
        this.price = price;
        this.originalPrice = originalPrice;
    }

    public String getWeight() { return weight; }
    public void setWeight(String weight) { this.weight = weight; }

    public int getPrice() { return price; }
    public void setPrice(int price) { this.price = price; }

    public int getOriginalPrice() { return originalPrice; }
    public void setOriginalPrice(int originalPrice) { this.originalPrice = originalPrice; }
}
