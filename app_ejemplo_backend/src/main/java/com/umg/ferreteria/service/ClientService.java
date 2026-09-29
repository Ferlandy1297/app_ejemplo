package com.umg.ferreteria.service;

import com.umg.ferreteria.dto.request.ClientCreateRequest;
import com.umg.ferreteria.dto.request.ClientUpdateRequest;
import com.umg.ferreteria.dto.response.ClientResponse;
import com.umg.ferreteria.dto.response.PageResponse;
import org.springframework.data.domain.Pageable;

public interface ClientService {
    PageResponse<ClientResponse> getClients(String search, Pageable pageable);
    ClientResponse getClientById(String id);
    ClientResponse createClient(ClientCreateRequest request);
    ClientResponse updateClient(String id, ClientUpdateRequest request);
    void deleteClient(String id);
    ClientResponse toggleClientStatus(String id);
}
