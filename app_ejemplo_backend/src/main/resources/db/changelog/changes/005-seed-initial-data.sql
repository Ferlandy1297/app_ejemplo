--liquibase formatted sql

--changeset umg:005-seed-roles
INSERT INTO roles (id, name, description) VALUES
('r001', 'ROLE_ADMIN', 'Administrador general con acceso total'),
('r002', 'ROLE_VENTAS', 'Usuario de ventas y consultas con acceso limitado')
ON CONFLICT (id) DO NOTHING;

--changeset umg:005-seed-categories
INSERT INTO categories (id, name, description, is_active) VALUES
('cat001', 'Herramientas Eléctricas', 'Taladros, esmeriles, sierras y pulidoras', true),
('cat002', 'Herramientas Manuales', 'Martillos, destornilladores, llaves y pinzas', true),
('cat003', 'Pinturas & Acabados', 'Pinturas látex, anticorrosivos y brochas', true),
('cat004', 'Plomería & Tuberías', 'Tubos PVC, accesorios, grifería y pegamentos', true),
('cat005', 'Material Eléctrico', 'Cables THHN, tomacorrientes y breakers', true)
ON CONFLICT (id) DO NOTHING;

--changeset umg:005-seed-products
INSERT INTO products (id, name, sku, category_id, selling_price, cost_price, stock, min_stock, unit, description, image_url, is_active, created_at) VALUES
('p001', 'Taladro Inalámbrico 20V DeWalt', 'TAL-DW-20V', 'cat001', 145.00, 110.00, 18, 5, 'Unidad', 'Taladro percutor con 2 baterías de litio y maletín.', 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80', true, CURRENT_TIMESTAMP),
('p002', 'Juego de Destornilladores Stanley (10 pzs)', 'DES-ST-10P', 'cat002', 24.50, 16.00, 35, 10, 'Juego', 'Destornilladores planos y phillips con mango ergonómico.', 'https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?auto=format&fit=crop&w=800&q=80', true, CURRENT_TIMESTAMP),
('p003', 'Pintura Látex Blanca Cubeta 5 Gal', 'PIN-LT-5GL', 'cat003', 68.00, 48.00, 22, 6, 'Cubeta', 'Pintura antihongos de alto cubrimiento lavable.', 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80', true, CURRENT_TIMESTAMP),
('p004', 'Tubo PVC Presión 1/2 pulgada (6m)', 'TUB-PVC-05', 'cat004', 6.25, 4.10, 80, 20, 'Tubo', 'Tubo PVC cédula 40 para conducción de agua potable.', 'https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&w=800&q=80', true, CURRENT_TIMESTAMP),
('p005', 'Cable Eléctrico THHN Calibre 12 (100m)', 'CAB-TH-12C', 'cat005', 89.90, 68.00, 12, 4, 'Rollo', 'Conductor de cobre puro resistente a alta temperatura.', 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=800&q=80', true, CURRENT_TIMESTAMP)
ON CONFLICT (id) DO NOTHING;

--changeset umg:005-seed-clients
INSERT INTO clients (id, full_name, email, phone, address, nit, is_active, created_at) VALUES
('c001', 'Cliente Demo 01', 'cliente01@example.invalid', '0000-0001', 'Dirección de prueba 01', 'DEMO-001', true, CURRENT_TIMESTAMP),
('c002', 'Cliente Demo 02', 'cliente02@example.invalid', '0000-0002', 'Dirección de prueba 02', 'DEMO-002', true, CURRENT_TIMESTAMP),
('c003', 'Cliente Demo 03', 'cliente03@example.invalid', '0000-0003', 'Dirección de prueba 03', 'DEMO-003', true, CURRENT_TIMESTAMP),
('c004', 'Cliente Demo 04', 'cliente04@example.invalid', '0000-0004', 'Dirección de prueba 04', 'DEMO-004', false, CURRENT_TIMESTAMP),
('c005', 'Cliente Demo 05', 'cliente05@example.invalid', '0000-0005', 'Dirección de prueba 05', 'DEMO-005', true, CURRENT_TIMESTAMP),
('c006', 'Cliente Demo 06', 'cliente06@example.invalid', '0000-0006', 'Dirección de prueba 06', 'DEMO-006', true, CURRENT_TIMESTAMP),
('c007', 'Cliente Demo 07', 'cliente07@example.invalid', '0000-0007', 'Dirección de prueba 07', 'DEMO-007', true, CURRENT_TIMESTAMP),
('c008', 'Cliente Demo 08', 'cliente08@example.invalid', '0000-0008', 'Dirección de prueba 08', 'DEMO-008', false, CURRENT_TIMESTAMP),
('c009', 'Cliente Demo 09', 'cliente09@example.invalid', '0000-0009', 'Dirección de prueba 09', 'DEMO-009', true, CURRENT_TIMESTAMP),
('c010', 'Cliente Demo 10', 'cliente10@example.invalid', '0000-0010', 'Dirección de prueba 10', 'DEMO-010', true, CURRENT_TIMESTAMP)
ON CONFLICT (id) DO NOTHING;

--changeset umg:005-seed-suppliers
INSERT INTO suppliers (id, company_name, contact_name, email, phone, address, nit, is_active, created_at) VALUES
('sup001', 'Proveedor Demo 01', 'Contacto Demo 01', 'proveedor01@example.invalid', '0001-0001', 'Dirección de prueba', 'PROV-001', true, CURRENT_TIMESTAMP),
('sup002', 'Proveedor Demo 02', 'Contacto Demo 02', 'proveedor02@example.invalid', '0001-0002', 'Dirección de prueba', 'PROV-002', true, CURRENT_TIMESTAMP),
('sup003', 'Proveedor Demo 03', 'Contacto Demo 03', 'proveedor03@example.invalid', '0001-0003', 'Dirección de prueba', 'PROV-003', true, CURRENT_TIMESTAMP)
ON CONFLICT (id) DO NOTHING;
