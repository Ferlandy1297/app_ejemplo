--liquibase formatted sql

--changeset umg:004-create-suppliers
CREATE TABLE suppliers (
    id VARCHAR(50) PRIMARY KEY,
    company_name VARCHAR(150) NOT NULL,
    contact_name VARCHAR(150),
    email VARCHAR(150),
    phone VARCHAR(50) NOT NULL,
    address VARCHAR(255),
    nit VARCHAR(50) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITHOUT TIME ZONE
);

CREATE INDEX idx_suppliers_company_name ON suppliers(company_name);
CREATE INDEX idx_suppliers_nit ON suppliers(nit);
