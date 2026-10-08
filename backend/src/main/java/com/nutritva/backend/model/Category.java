package com.nutritva.backend.model;

public class Category {
    private int num;
    private String id;
    private String name;
    private String examples;
    private String icon;
    private int productCount;

    public Category() {}

    public Category(int num, String id, String name, String examples, String icon, int productCount) {
        this.num = num;
        this.id = id;
        this.name = name;
        this.examples = examples;
        this.icon = icon;
        this.productCount = productCount;
    }

    public int getNum() { return num; }
    public void setNum(int num) { this.num = num; }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getExamples() { return examples; }
    public void setExamples(String examples) { this.examples = examples; }

    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }

    public int getProductCount() { return productCount; }
    public void setProductCount(int productCount) { this.productCount = productCount; }
}
