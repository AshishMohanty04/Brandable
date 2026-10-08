package com.nutritva.backend.service;

import com.nutritva.backend.model.Category;
import com.nutritva.backend.model.Product;
import com.nutritva.backend.model.Review;
import com.nutritva.backend.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getProducts(String category, String search) {
        if (search != null && !search.trim().isEmpty()) {
            return productRepository.search(search);
        }
        if (category != null && !category.equalsIgnoreCase("ALL")) {
            return productRepository.findByCategory(category);
        }
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(String id) {
        return productRepository.findById(id);
    }

    public List<Category> getCategories() {
        return productRepository.findCategories();
    }

    public List<Product> getDeals() {
        return productRepository.findDeals();
    }

    public List<Review> getReviews(String productId) {
        return productRepository.getReviews(productId);
    }

    public Review addReview(String productId, Review review) {
        return productRepository.addReview(productId, review);
    }
}
