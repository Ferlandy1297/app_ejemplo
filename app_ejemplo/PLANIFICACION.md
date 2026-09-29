# Plan de Implementación: Sistema Web para Ferretería (Next.js / React)

Este documento contiene la planificación completa para el desarrollo por fases de la aplicación web de gestión para una **Ferretería**, incluyendo la arquitectura modular por dominios, las estructuras de datos de cada módulo, el diseño UX/UI en tonos claros y la hoja de ruta iterativa por entregables.

---

## 🏛️ Arquitectura Modular por Dominios (Domain-Driven Feature Modules)

La aplicación está organizada mediante **Módulos Funcionales Autocontenidos** en `src/modules/` combinados con una capa **Compartida** en `src/shared/` y el enrutamiento visual en `src/app/`:

```text
src/
├── modules/                        # Módulos Funcionales Autocontenidos
│   ├── public/                     # Módulo Público (Header, Footer)
│   ├── auth/                       # Módulo de Autenticación & Usuarios
│   │   ├── dtos/                   # user.dto.ts
│   │   ├── models/                 # user.model.ts
│   │   ├── adapters/               # user.adapter.ts
│   │   ├── services/               # auth.service.ts
│   │   ├── components/             # LoginModal.tsx
│   │   └── context/                # AuthContext.tsx
│   │
│   ├── products/                   # Módulo de Productos e Inventario
│   │   ├── dtos/                   # product.dto.ts
│   │   ├── models/                 # product.model.ts
│   │   ├── adapters/               # product.adapter.ts
│   │   └── services/               # product.service.ts
│   │
│   ├── clients/                    # Módulo de Clientes (Fase 2)
│   │   ├── dtos/                   # client.dto.ts
│   │   ├── models/                 # client.model.ts
│   │   ├── adapters/               # client.adapter.ts
│   │   └── services/               # client.service.ts
│   │
│   └── suppliers/                  # Módulo de Proveedores (Fase 3)
│       ├── dtos/                   # supplier.dto.ts
│       ├── models/                 # supplier.model.ts
│       ├── adapters/               # supplier.adapter.ts
│       └── services/               # supplier.service.ts
│
├── shared/                         # Capa Compartida Reutilizable
│   ├── components/                 # UI Kit Compartido (Botones, Inputs, Modales, Tablas, Badges)
│   ├── data/                       # Archivos JSON Base (users.json, products.json, etc.)
│   └── utils/                      # Funciones auxiliares generales
│
└── app/                            # Enrutamiento Visual (Next.js App Router)
    ├── (public)/                   # Rutas Públicas (/, /nosotros, /productos, /contacto)
    └── (private)/dashboard/        # Rutas Privadas (/dashboard, /dashboard/clientes, etc.)
```

---

## 🗂️ Estructura de Datos por Módulo

### 1. `modules/products` (Productos e Inventario)
- **DTO**: `prod_id`, `prod_code` (SKU), `prod_name`, `prod_category`, `prod_price_sell`, `prod_price_buy`, `prod_stock`, `prod_min_stock`, `prod_unit`, `prod_img`.
- **Model**: `id`, `sku`, `name`, `category`, `sellingPrice`, `costPrice`, `stock`, `minStock`, `unit`, `imageUrl`, `isLowStock`.

### 2. `modules/clients` (Clientes - Fase 2)
- **DTO**: `cli_id`, `cli_nit`, `cli_name`, `cli_phone`, `cli_email`, `cli_address`, `cli_type`, `cli_status`.
- **Model**: `id`, `nit`, `name`, `phone`, `email`, `address`, `clientType`, `status`.

### 3. `modules/suppliers` (Proveedores - Fase 3)
- **DTO**: `sup_id`, `sup_nit`, `sup_company_name`, `sup_contact_name`, `sup_phone`, `sup_email`, `sup_category`.
- **Model**: `id`, `nit`, `companyName`, `contactName`, `phone`, `email`, `category`.

### 4. `modules/auth` (Usuarios y Autenticación)
- **DTO**: `usr_id`, `usr_email`, `usr_pass`, `usr_full_name`, `usr_role_code`, `usr_is_active`.
- **Model**: `id`, `email`, `fullName`, `role` (`ADMIN` | `LIMITED`), `isActive`.

---

## 🗺️ Hoja de Ruta Iterativa por Fases

1. **FASE 1 (Completada & Publicada)**: Configuración base, capas modulares (`auth`, `products`, `public`, `shared`), visualización pública con carrusel dinámico, modal de login y dashboard base.
2. **FASE 2 (Siguiente Paso)**: Módulo `clients/` con CRUD completo (Tabla, Filtro, Modal Crear/Editar, Modal Eliminar) y control de permisos (`ADMIN` vs `LIMITED`).
3. **FASE 3**: Módulo `suppliers/` con CRUD completo (Sólo `ADMIN`).
4. **FASE 4**: Módulo de Ventas / POS (Registrar venta, descuenta stock, emite ticket).
5. **FASE 5**: Persistencia refinada en `localStorage` y pulido final de UX/UI.
