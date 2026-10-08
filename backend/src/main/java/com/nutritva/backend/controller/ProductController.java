package com.nutritva.backend.controller;

import com.nutritva.backend.model.ApiResponse;
import com.nutritva.backend.model.Category;
import com.nutritva.backend.model.Product;
import com.nutritva.backend.model.Review;
import com.nutritva.backend.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/products")
    public ResponseEntity<List<Product>> getProducts(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search) {
        List<Product> products = productService.getProducts(category, search);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<ApiResponse<Product>> getProductById(@PathVariable String id) {
        return productService.getProductById(id)
                .map(p -> ResponseEntity.ok(ApiResponse.ok("Product found", p)))
                .orElse(ResponseEntity.status(404).body(ApiResponse.error("Product with ID " + id + " not found")));
    }

    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getCategories() {
        return ResponseEntity.ok(productService.getCategories());
    }

    @GetMapping("/products/deals")
    public ResponseEntity<List<Product>> getDeals() {
        return ResponseEntity.ok(productService.getDeals());
    }

    @GetMapping("/products/{id}/reviews")
    public ResponseEntity<List<Review>> getReviews(@PathVariable String id) {
        return ResponseEntity.ok(productService.getReviews(id));
    }

    @PostMapping("/products/{id}/reviews")
    public ResponseEntity<ApiResponse<Review>> addReview(
            @PathVariable String id,
            @RequestBody Review review) {
        Review created = productService.addReview(id, review);
        return ResponseEntity.ok(ApiResponse.ok("Review added successfully", created));
    }
}
