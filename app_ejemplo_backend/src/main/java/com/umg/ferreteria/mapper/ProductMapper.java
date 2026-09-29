package com.umg.ferreteria.mapper;

import com.umg.ferreteria.dto.response.ProductResponse;
import com.umg.ferreteria.model.Product;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {

    public ProductResponse toResponse(Product product) {
        if (product == null) return null;
        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .sku(product.getSku())
                .categoryId(product.getCategory() != null ? product.getCategory().getId() : null)
                .categoryName(product.getCategory() != null ? product.getCategory().getName() : null)
                .sellingPrice(product.getSellingPrice())
                .costPrice(product.getCostPrice())
                .stock(product.getStock())
                .minStock(product.getMinStock())
                .unit(product.getUnit())
                .description(product.getDescription())
                .imageUrl(product.getImageUrl())
                .isActive(product.getIsActive())
                .build();
    }
}
