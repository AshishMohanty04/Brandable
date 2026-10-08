package com.nutritva.backend.model;

public class NutritionInfo {
    private String servingSize;
    private int calories;
    private String protein;
    private String dietaryFiber;
    private String healthyFats;

    public NutritionInfo() {}

    public NutritionInfo(String servingSize, int calories, String protein, String dietaryFiber, String healthyFats) {
        this.servingSize = servingSize;
        this.calories = calories;
        this.protein = protein;
        this.dietaryFiber = dietaryFiber;
        this.healthyFats = healthyFats;
    }

    public String getServingSize() { return servingSize; }
    public void setServingSize(String servingSize) { this.servingSize = servingSize; }

    public int getCalories() { return calories; }
    public void setCalories(int calories) { this.calories = calories; }

    public String getProtein() { return protein; }
    public void setProtein(String protein) { this.protein = protein; }

    public String getDietaryFiber() { return dietaryFiber; }
    public void setDietaryFiber(String dietaryFiber) { this.dietaryFiber = dietaryFiber; }

    public String getHealthyFats() { return healthyFats; }
    public void setHealthyFats(String healthyFats) { this.healthyFats = healthyFats; }
}
