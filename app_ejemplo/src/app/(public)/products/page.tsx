'use client';

import React, { useState, useEffect } from 'react';
import { ProductModel } from '@/modules/products/models/product.model';
import { ProductService } from '@/modules/products/services/product.service';
import { ProductAdapter } from '@/modules/products/adapters/product.adapter';
import { Search, Filter, Package, AlertTriangle, Loader2 } from 'lucide-react';

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      const dtos = await ProductService.getProducts();
      const models = ProductAdapter.toModelList(dtos);
      setProducts(models);
      setLoading(false);
    }
    loadProducts();
  }, []);

  const categories = ['Todas', ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                          p.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'Todas' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">

      {/* Encabezado */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Catálogo de Productos Ferreteros
        </h1>
        <p className="text-slate-500 text-sm">
          Explora herramientas, insumos y materiales en inventario con precios actualizados.
        </p>
      </div>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre o SKU (ej. HER-001)..."
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
          />
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          <Filter className="w-4 h-4 text-slate-400 shrink-0 hidden sm:inline-block" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Productos */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400 space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
          <span className="text-sm font-medium">Cargando catálogo...</span>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 p-8 space-y-3">
          <Package className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No se encontraron productos</h3>
          <p className="text-xs text-slate-500">Prueba con otros términos de búsqueda o selecciona otra categoría.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col"
            >
              <div className="relative h-48 bg-slate-100 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                <span className="absolute top-3 left-3 px-2.5 py-1 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold rounded-lg uppercase tracking-wider">
                  {product.category}
                </span>

                {product.isLowStock && (
                  <span className="absolute top-3 right-3 px-2.5 py-1 bg-amber-500 text-white text-[10px] font-bold rounded-lg flex items-center space-x-1 shadow-sm">
                    <AlertTriangle className="w-3 h-3" />
                    <span>Stock Bajo</span>
                  </span>
                )}
              </div>

              <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <div className="text-[11px] font-mono font-semibold text-slate-400">SKU: {product.sku}</div>
                  <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-indigo-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2">{product.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block">Precio Venta</span>
                    <span className="text-xl font-extrabold text-slate-900">${product.sellingPrice.toFixed(2)}</span>
                    <span className="text-xs text-slate-400"> / {product.unit}</span>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">Disponible</span>
                    <span className={`text-sm font-bold ${product.isLowStock ? 'text-amber-600' : 'text-emerald-600'}`}>
                      {product.stock} {product.unit}s
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
