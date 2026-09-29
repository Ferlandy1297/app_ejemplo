--liquibase formatted sql

--changeset umg:002-create-clients
CREATE TABLE clients (
    id VARCHAR(50) PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    address VARCHAR(255) NOT NULL,
    nit VARCHAR(50) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITHOUT TIME ZONE
);

CREATE INDEX idx_clients_full_name ON clients(full_name);
CREATE INDEX idx_clients_email ON clients(email);
CREATE INDEX idx_clients_nit ON clients(nit);
CREATE INDEX idx_clients_is_active ON clients(is_active);
