package com.umg.ferreteria.service.impl;

import com.umg.ferreteria.dto.response.CategoryResponse;
import com.umg.ferreteria.dto.response.PageResponse;
import com.umg.ferreteria.dto.response.ProductResponse;
import com.umg.ferreteria.exception.ResourceNotFoundException;
import com.umg.ferreteria.mapper.CategoryMapper;
import com.umg.ferreteria.mapper.ProductMapper;
import com.umg.ferreteria.model.Product;
import com.umg.ferreteria.repository.CategoryRepository;
import com.umg.ferreteria.repository.ProductRepository;
import com.umg.ferreteria.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ProductMapper productMapper;
    private final CategoryMapper categoryMapper;

    @Override
    @Transactional(readOnly = true)
    public PageResponse<ProductResponse> getActiveProducts(String search, Pageable pageable) {
        Page<Product> page;
        if (search != null && !search.trim().isEmpty()) {
            page = productRepository.searchActiveProducts(search.trim(), pageable);
        } else {
            page = productRepository.findAll(pageable);
        }
        return PageResponse.from(page.map(productMapper::toResponse));
    }

    @Override
    @Transactional(readOnly = true)
    public List<CategoryResponse> getActiveCategories() {
        return categoryRepository.findByIsActiveTrue()
                .stream()
                .map(categoryMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public ProductResponse getProductById(String id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado con id: " + id));
        return productMapper.toResponse(product);
    }
}
