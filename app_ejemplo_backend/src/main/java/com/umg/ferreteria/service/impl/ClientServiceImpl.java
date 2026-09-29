package com.umg.ferreteria.service.impl;

import com.umg.ferreteria.dto.request.ClientCreateRequest;
import com.umg.ferreteria.dto.request.ClientUpdateRequest;
import com.umg.ferreteria.dto.response.ClientResponse;
import com.umg.ferreteria.dto.response.PageResponse;
import com.umg.ferreteria.exception.BadRequestException;
import com.umg.ferreteria.exception.ResourceNotFoundException;
import com.umg.ferreteria.mapper.ClientMapper;
import com.umg.ferreteria.model.Client;
import com.umg.ferreteria.repository.ClientRepository;
import com.umg.ferreteria.service.ClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ClientServiceImpl implements ClientService {

    private final ClientRepository clientRepository;
    private final ClientMapper clientMapper;

    @Override
    @Transactional(readOnly = true)
    public PageResponse<ClientResponse> getClients(String search, Pageable pageable) {
        Page<Client> page;
        if (search != null && !search.trim().isEmpty()) {
            page = clientRepository.searchClients(search.trim(), pageable);
        } else {
            page = clientRepository.findAll(pageable);
        }
        return PageResponse.from(page.map(clientMapper::toResponse));
    }

    @Override
    @Transactional(readOnly = true)
    public ClientResponse getClientById(String id) {
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado con id: " + id));
        return clientMapper.toResponse(client);
    }

    @Override
    @Transactional
    public ClientResponse createClient(ClientCreateRequest request) {
        String nit = request.getNit().trim().toUpperCase();
        clientRepository.findByNit(nit).ifPresent(c -> {
            throw new BadRequestException("Ya existe un cliente registrado con el NIT: " + nit);
        });

        Client client = clientMapper.toEntity(request);
        Client saved = clientRepository.save(client);
        return clientMapper.toResponse(saved);
    }

    @Override
    @Transactional
    public ClientResponse updateClient(String id, ClientUpdateRequest request) {
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado con id: " + id));

        String newNit = request.getNit().trim().toUpperCase();
        if (!client.getNit().equalsIgnoreCase(newNit)) {
            clientRepository.findByNit(newNit).ifPresent(c -> {
                throw new BadRequestException("Ya existe otro cliente con el NIT: " + newNit);
            });
        }

        clientMapper.updateEntity(client, request);
        Client updated = clientRepository.save(client);
        return clientMapper.toResponse(updated);
    }

    @Override
    @Transactional
    public void deleteClient(String id) {
        if (!clientRepository.existsById(id)) {
            throw new ResourceNotFoundException("Cliente no encontrado con id: " + id);
        }
        clientRepository.deleteById(id);
    }

    @Override
    @Transactional
    public ClientResponse toggleClientStatus(String id) {
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Cliente no encontrado con id: " + id));

        client.setIsActive(!Boolean.TRUE.equals(client.getIsActive()));
        Client updated = clientRepository.save(client);
        return clientMapper.toResponse(updated);
    }
}
