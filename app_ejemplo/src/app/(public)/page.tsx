'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Wrench,
  ShieldCheck,
  Truck,
  PackageCheck,
  Headphones,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Star,
} from 'lucide-react';

const heroProducts = [
  {
    id: 'p001',
    name: 'Taladro Inalámbrico 20V DeWalt',
    category: 'Herramientas Eléctricas',
    price: 145.00,
    badge: 'Destacado',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
    description: 'Motor sin carbones de alto rendimiento con 2 baterías de litio y maletín reforzado.',
  },
  {
    id: 'p003',
    name: 'Pintura Látex Blanca Cubeta 5 Gal',
    category: 'Pinturas & Acabados',
    price: 68.00,
    badge: 'Alta Durabilidad',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
    description: 'Máximo cubrimiento y lavabilidad para interiores y exteriores de uso industrial.',
  },
  {
    id: 'p002',
    name: 'Juego de Destornilladores Stanley (10 pzs)',
    category: 'Herramientas Manuales',
    price: 24.50,
    badge: 'Top Ventas',
    image: 'https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?auto=format&fit=crop&w=800&q=80',
    description: 'Mangos ergonómicos antideslizantes con puntas magnéticas rectificadas.',
  },
  {
    id: 'p005',
    name: 'Cable Eléctrico THHN Calibre 12 (100m)',
    category: 'Material Eléctrico',
    price: 89.90,
    badge: 'Certificado ISO',
    image: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=800&q=80',
    description: 'Cobre 100% puro con aislamiento termoplástico resistente al fuego y humedad.',
  },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroProducts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroProducts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroProducts.length - 1 : prev - 1));
  };

  const activeProduct = heroProducts[currentSlide];

  return (
    <div className="space-y-16 pb-16">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 text-white overflow-hidden py-12 lg:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:24px_24px] opacity-15"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-indigo-500/20 border border-indigo-400/30 rounded-full text-indigo-300 text-xs font-semibold">
                <Wrench className="w-3.5 h-3.5" />
                <span>Ferretería Profesional & Suministros</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                Herramientas e Insumos <br />
                <span className="text-indigo-400">para Cada Proyecto</span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
                Ofrecemos el catálogo más completo para la construcción, plomería, electricidad y acabados. Productos garantizados con entrega inmediata.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
                <Link
                  href="/products"
                  className="w-full sm:w-auto px-7 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-indigo-500/30 transition-all flex items-center justify-center space-x-2"
                >
                  <span>Ver Catálogo Completo</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/contact"
                  className="w-full sm:w-auto px-7 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl transition-all text-center"
                >
                  Solicitar Cotización
                </Link>
              </div>

              <div className="pt-6 border-t border-slate-800 grid grid-cols-3 gap-2 text-center lg:text-left">
                <div>
                  <span className="text-xl font-bold text-white block">+2,500</span>
                  <span className="text-[11px] text-slate-400">Productos en Stock</span>
                </div>
                <div>
                  <span className="text-xl font-bold text-white block">24h</span>
                  <span className="text-[11px] text-slate-400">Entrega Garantizada</span>
                </div>
                <div>
                  <span className="text-xl font-bold text-white block">100%</span>
                  <span className="text-[11px] text-slate-400">Marcas Originales</span>
                </div>
              </div>
            </div>

            {/* Carrusel */}
            <div
              className="lg:col-span-6 relative"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-4 sm:p-6 border border-white/15 shadow-2xl overflow-hidden transition-all">

                <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden bg-slate-800">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={activeProduct.image}
                    alt={activeProduct.name}
                    className="w-full h-full object-cover transition-all duration-700 transform scale-105 hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

                  <span className="absolute top-4 left-4 px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded-lg shadow">
                    {activeProduct.badge}
                  </span>

                  <span className="absolute top-4 right-4 px-3 py-1 bg-slate-900/80 backdrop-blur-md text-slate-200 text-xs font-semibold rounded-lg border border-white/10">
                    {activeProduct.category}
                  </span>

                  <div className="absolute bottom-4 left-4 right-4 space-y-1">
                    <div className="flex items-center space-x-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <h3 className="text-lg font-bold text-white drop-shadow">
                      {activeProduct.name}
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-1">
                      {activeProduct.description}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 block uppercase font-semibold">Precio de Oferta</span>
                    <span className="text-2xl font-extrabold text-white">${activeProduct.price.toFixed(2)}</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-1.5 mr-2">
                      {heroProducts.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentSlide(idx)}
                          className={`h-2 rounded-full transition-all ${
                            currentSlide === idx ? 'w-6 bg-indigo-500' : 'w-2 bg-slate-600'
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={prevSlide}
                      className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Ventajas */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm space-y-3">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl w-fit">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-800 text-base">Entrega Directa</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Despacho express a tu taller, hogar u obra de construcción.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm space-y-3">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl w-fit">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-800 text-base">Garantía Directa</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Respaldamos la calidad de todas nuestras herramientas e insumos.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm space-y-3">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl w-fit">
              <PackageCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-800 text-base">Disponibilidad</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Inventarios siempre actualizados para atender pedidos voluminosos.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm space-y-3">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl w-fit">
              <Headphones className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-800 text-base">Soporte Técnico</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Asesoramiento profesional para la elección adecuada de materiales.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              ¿Necesitas un presupuesto formal?
            </h2>
            <p className="text-slate-300 text-sm max-w-xl">
              Envíanos el listado de tus insumos o planos y te preparamos una oferta personalizada con precios especiales de mayorista.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 px-7 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all shadow-md"
          >
            Contactar Asesor
          </Link>
        </div>
      </section>

    </div>
  );
}
