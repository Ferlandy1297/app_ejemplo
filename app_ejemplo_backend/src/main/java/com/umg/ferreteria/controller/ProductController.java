package com.umg.ferreteria.controller;

import com.umg.ferreteria.dto.response.ApiResponse;
import com.umg.ferreteria.dto.response.CategoryResponse;
import com.umg.ferreteria.dto.response.PageResponse;
import com.umg.ferreteria.dto.response.ProductResponse;
import com.umg.ferreteria.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@Tag(name = "Productos & Categorías", description = "Endpoints para el catálogo público e inventario de productos y categorías")
public class ProductController {

    private final ProductService productService;

    @GetMapping("/products")
    @Operation(summary = "Listar productos activos", description = "Catálogo de productos con paginación y búsqueda")
    public ResponseEntity<ApiResponse<PageResponse<ProductResponse>>> getProducts(
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "name") String sortBy,
            @RequestParam(defaultValue = "asc") String direction
    ) {
        Sort sort = direction.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        PageResponse<ProductResponse> response = productService.getActiveProducts(search, pageable);
        return ResponseEntity.ok(ApiResponse.ok("Productos obtenidos exitosamente", response));
    }

    @GetMapping("/products/{id}")
    @Operation(summary = "Obtener producto por ID", description = "Consulta los detalles de un producto específico")
    public ResponseEntity<ApiResponse<ProductResponse>> getProductById(@PathVariable String id) {
        ProductResponse response = productService.getProductById(id);
        return ResponseEntity.ok(ApiResponse.ok("Producto encontrado", response));
    }

    @GetMapping("/categories")
    @Operation(summary = "Listar categorías activas", description = "Obtiene las categorías de productos disponibles")
    public ResponseEntity<ApiResponse<List<CategoryResponse>>> getCategories() {
        List<CategoryResponse> response = productService.getActiveCategories();
        return ResponseEntity.ok(ApiResponse.ok("Categorías obtenidas exitosamente", response));
    }
}
