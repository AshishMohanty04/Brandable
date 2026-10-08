package com.nutritva.backend.model;

import java.util.List;

public class Product {
    private String id;
    private String name;
    private String tagline;
    private String category;
    private String categoryLabel;
    private String badge;
    private double rating;
    private int reviewsCount;
    private String image;
    private List<ProductWeightOption> weightOptions;
    private String description;
    private String ingredients;
    private List<String> benefits;
    private NutritionInfo nutrition;

    public Product() {}

    public Product(String id, String name, String tagline, String category, String categoryLabel,
                   String badge, double rating, int reviewsCount, String image,
                   List<ProductWeightOption> weightOptions, String description,
                   String ingredients, List<String> benefits, NutritionInfo nutrition) {
        this.id = id;
        this.name = name;
        this.tagline = tagline;
        this.category = category;
        this.categoryLabel = categoryLabel;
        this.badge = badge;
        this.rating = rating;
        this.reviewsCount = reviewsCount;
        this.image = image;
        this.weightOptions = weightOptions;
        this.description = description;
        this.ingredients = ingredients;
        this.benefits = benefits;
        this.nutrition = nutrition;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getTagline() { return tagline; }
    public void setTagline(String tagline) { this.tagline = tagline; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getCategoryLabel() { return categoryLabel; }
    public void setCategoryLabel(String categoryLabel) { this.categoryLabel = categoryLabel; }

    public String getBadge() { return badge; }
    public void setBadge(String badge) { this.badge = badge; }

    public double getRating() { return rating; }
    public void setRating(double rating) { this.rating = rating; }

    public int getReviewsCount() { return reviewsCount; }
    public void setReviewsCount(int reviewsCount) { this.reviewsCount = reviewsCount; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public List<ProductWeightOption> getWeightOptions() { return weightOptions; }
    public void setWeightOptions(List<ProductWeightOption> weightOptions) { this.weightOptions = weightOptions; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getIngredients() { return ingredients; }
    public void setIngredients(String ingredients) { this.ingredients = ingredients; }

    public List<String> getBenefits() { return benefits; }
    public void setBenefits(List<String> benefits) { this.benefits = benefits; }

    public NutritionInfo getNutrition() { return nutrition; }
    public void setNutrition(NutritionInfo nutrition) { this.nutrition = nutrition; }
}
