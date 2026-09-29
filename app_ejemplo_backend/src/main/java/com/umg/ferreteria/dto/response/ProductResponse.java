package com.umg.ferreteria.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponse {
    private String id;
    private String name;
    private String sku;
    private String categoryId;
    private String categoryName;
    private BigDecimal sellingPrice;
    private BigDecimal costPrice;
    private Integer stock;
    private Integer minStock;
    private String unit;
    private String description;
    private String imageUrl;
    private Boolean isActive;
}
