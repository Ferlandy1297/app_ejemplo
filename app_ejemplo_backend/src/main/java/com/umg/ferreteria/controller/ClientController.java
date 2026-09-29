package com.umg.ferreteria.controller;

import com.umg.ferreteria.dto.request.ClientCreateRequest;
import com.umg.ferreteria.dto.request.ClientUpdateRequest;
import com.umg.ferreteria.dto.response.ApiResponse;
import com.umg.ferreteria.dto.response.ClientResponse;
import com.umg.ferreteria.dto.response.PageResponse;
import com.umg.ferreteria.service.ClientService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/clients")
@RequiredArgsConstructor
@Tag(name = "Clientes", description = "Endpoints para la gestión integral y CRUD de clientes")
public class ClientController {

    private final ClientService clientService;

    @GetMapping
    @Operation(summary = "Listar clientes", description = "Obtiene la lista de clientes de forma paginada y con soporte de búsqueda")
    public ResponseEntity<ApiResponse<PageResponse<ClientResponse>>> getClients(
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String direction
    ) {
        Sort sort = direction.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        PageResponse<ClientResponse> response = clientService.getClients(search, pageable);
        return ResponseEntity.ok(ApiResponse.ok("Clientes obtenidos exitosamente", response));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener cliente por ID", description = "Consulta los detalles de un cliente específico")
    public ResponseEntity<ApiResponse<ClientResponse>> getClientById(@PathVariable String id) {
        ClientResponse response = clientService.getClientById(id);
        return ResponseEntity.ok(ApiResponse.ok("Cliente encontrado", response));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'VENTAS')")
    @Operation(summary = "Crear nuevo cliente", description = "Registra un nuevo cliente con validaciones de campos y NIT")
    public ResponseEntity<ApiResponse<ClientResponse>> createClient(@Valid @RequestBody ClientCreateRequest request) {
        ClientResponse response = clientService.createClient(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok("Cliente creado exitosamente", response));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'VENTAS')")
    @Operation(summary = "Actualizar cliente", description = "Actualiza los datos de un cliente existente")
    public ResponseEntity<ApiResponse<ClientResponse>> updateClient(
            @PathVariable String id,
            @Valid @RequestBody ClientUpdateRequest request
    ) {
        ClientResponse response = clientService.updateClient(id, request);
        return ResponseEntity.ok(ApiResponse.ok("Cliente actualizado exitosamente", response));
    }

    @PatchMapping("/{id}/toggle-status")
    @PreAuthorize("hasAnyRole('ADMIN', 'VENTAS')")
    @Operation(summary = "Alternar estado activo/inactivo", description = "Cambia el estado activo o inactivo del cliente")
    public ResponseEntity<ApiResponse<ClientResponse>> toggleStatus(@PathVariable String id) {
        ClientResponse response = clientService.toggleClientStatus(id);
        return ResponseEntity.ok(ApiResponse.ok("Estado del cliente actualizado", response));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    @Operation(summary = "Eliminar cliente", description = "Elimina permanentemente un cliente (requiere rol ADMIN)")
    public ResponseEntity<ApiResponse<Void>> deleteClient(@PathVariable String id) {
        clientService.deleteClient(id);
        return ResponseEntity.ok(ApiResponse.ok("Cliente eliminado exitosamente", null));
    }
}
