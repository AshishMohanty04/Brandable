package com.nutritva.backend.repository;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nutritva.backend.model.Category;
import com.nutritva.backend.model.Product;
import com.nutritva.backend.model.Review;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Repository;

import java.io.InputStream;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Repository
public class ProductRepository {

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final List<Product> products = new ArrayList<>();
    private final List<Category> categories = new ArrayList<>();
    private final Map<String, List<Review>> productReviews = new ConcurrentHashMap<>();

    @PostConstruct
    public void init() {
        try {
            // Load products
            InputStream productsStream = getClass().getResourceAsStream("/data/products.json");
            if (productsStream != null) {
                List<Product> loadedProducts = objectMapper.readValue(productsStream, new TypeReference<List<Product>>() {});
                products.addAll(loadedProducts);
            }

            // Load categories
            InputStream categoriesStream = getClass().getResourceAsStream("/data/categories.json");
            if (categoriesStream != null) {
                List<Category> loadedCategories = objectMapper.readValue(categoriesStream, new TypeReference<List<Category>>() {});
                categories.addAll(loadedCategories);
            }

            // Calculate product counts per category
            for (Category cat : categories) {
                long count = products.stream()
                        .filter(p -> p.getCategory() != null && p.getCategory().equalsIgnoreCase(cat.getId()))
                        .count();
                cat.setProductCount((int) count);
            }

            // Initialize sample verified reviews for products
            for (Product p : products) {
                List<Review> initialReviews = new ArrayList<>();
                initialReviews.add(new Review(
                        UUID.randomUUID().toString(),
                        p.getId(),
                        "Pooja Sharma",
                        5.0,
                        "Incredible crunch and freshness! Arrived in under 12 minutes, super fast delivery.",
                        "2 hours ago"
                ));
                initialReviews.add(new Review(
                        UUID.randomUUID().toString(),
                        p.getId(),
                        "Rahul Verma",
                        4.8,
                        "Much better quality than local stores. 100% natural and clean packaging.",
                        "1 day ago"
                ));
                productReviews.put(p.getId(), initialReviews);
            }

        } catch (Exception e) {
            System.err.println("Failed to load initial catalog data: " + e.getMessage());
        }
    }

    public List<Product> findAll() {
        return new ArrayList<>(products);
    }

    public Optional<Product> findById(String id) {
        return products.stream()
                .filter(p -> p.getId().equalsIgnoreCase(id))
                .findFirst();
    }

    public List<Product> findByCategory(String category) {
        if (category == null || category.equalsIgnoreCase("ALL")) {
            return findAll();
        }
        return products.stream()
                .filter(p -> p.getCategory() != null && p.getCategory().equalsIgnoreCase(category))
                .collect(Collectors.toList());
    }

    public List<Product> search(String query) {
        if (query == null || query.trim().isEmpty()) {
            return findAll();
        }
        String q = query.toLowerCase().trim();
        return products.stream()
                .filter(p -> (p.getName() != null && p.getName().toLowerCase().contains(q)) ||
                             (p.getTagline() != null && p.getTagline().toLowerCase().contains(q)) ||
                             (p.getCategoryLabel() != null && p.getCategoryLabel().toLowerCase().contains(q)) ||
                             (p.getDescription() != null && p.getDescription().toLowerCase().contains(q)) ||
                             (p.getIngredients() != null && p.getIngredients().toLowerCase().contains(q)))
                .collect(Collectors.toList());
    }

    public List<Category> findCategories() {
        return new ArrayList<>(categories);
    }

    public List<Product> findDeals() {
        return products.stream()
                .filter(p -> p.getBadge() != null && !p.getBadge().isEmpty())
                .limit(8)
                .collect(Collectors.toList());
    }

    public List<Review> getReviews(String productId) {
        return productReviews.getOrDefault(productId, Collections.emptyList());
    }

    public Review addReview(String productId, Review review) {
        review.setId(UUID.randomUUID().toString());
        review.setProductId(productId);
        productReviews.computeIfAbsent(productId, k -> new ArrayList<>()).add(0, review);
        return review;
    }
}
