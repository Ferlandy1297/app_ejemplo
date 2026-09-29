package com.umg.ferreteria.mapper;

import com.umg.ferreteria.dto.request.ClientCreateRequest;
import com.umg.ferreteria.dto.request.ClientUpdateRequest;
import com.umg.ferreteria.dto.response.ClientResponse;
import com.umg.ferreteria.model.Client;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class ClientMapper {

    public Client toEntity(ClientCreateRequest request) {
        if (request == null) return null;
        return Client.builder()
                .id("c" + UUID.randomUUID().toString().substring(0, 8))
                .fullName(request.getFullName().trim())
                .email(request.getEmail().trim().toLowerCase())
                .phone(request.getPhone().trim())
                .address(request.getAddress().trim())
                .nit(request.getNit().trim().toUpperCase())
                .isActive(request.getIsActive() != null ? request.getIsActive() : true)
                .build();
    }

    public void updateEntity(Client client, ClientUpdateRequest request) {
        if (client == null || request == null) return;
        client.setFullName(request.getFullName().trim());
        client.setEmail(request.getEmail().trim().toLowerCase());
        client.setPhone(request.getPhone().trim());
        client.setAddress(request.getAddress().trim());
        client.setNit(request.getNit().trim().toUpperCase());
        if (request.getIsActive() != null) {
            client.setIsActive(request.getIsActive());
        }
    }

    public ClientResponse toResponse(Client client) {
        if (client == null) return null;
        return ClientResponse.builder()
                .id(client.getId())
                .fullName(client.getFullName())
                .email(client.getEmail())
                .phone(client.getPhone())
                .address(client.getAddress())
                .nit(client.getNit())
                .isActive(client.getIsActive())
                .createdAt(client.getCreatedAt())
                .build();
    }
}
