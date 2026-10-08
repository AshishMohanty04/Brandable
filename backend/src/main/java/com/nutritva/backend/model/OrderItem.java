package com.nutritva.backend.model;

public class OrderItem {
    private String productId;
    private String productName;
    private String weight;
    private int price;
    private int originalPrice;
    private int quantity;
    private String image;

    public OrderItem() {}

    public OrderItem(String productId, String productName, String weight, int price, int originalPrice, int quantity, String image) {
        this.productId = productId;
        this.productName = productName;
        this.weight = weight;
        this.price = price;
        this.originalPrice = originalPrice;
        this.quantity = quantity;
        this.image = image;
    }

    public String getProductId() { return productId; }
    public void setProductId(String productId) { this.productId = productId; }

    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }

    public String getWeight() { return weight; }
    public void setWeight(String weight) { this.weight = weight; }

    public int getPrice() { return price; }
    public void setPrice(int price) { this.price = price; }

    public int getOriginalPrice() { return originalPrice; }
    public void setOriginalPrice(int originalPrice) { this.originalPrice = originalPrice; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }
}
