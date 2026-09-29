package com.umg.ferreteria.service;

import com.umg.ferreteria.dto.response.CategoryResponse;
import com.umg.ferreteria.dto.response.PageResponse;
import com.umg.ferreteria.dto.response.ProductResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProductService {
    PageResponse<ProductResponse> getActiveProducts(String search, Pageable pageable);
    List<CategoryResponse> getActiveCategories();
    ProductResponse getProductById(String id);
}
