'use client';

import React from 'react';
import Link from 'next/link';
import { Wrench, Phone, Mail, MapPin, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-sm border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Columna 1 */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-indigo-600 text-white rounded-xl">
                <Wrench className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">Ferretería Express</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Tu aliado confiable en herramientas, materiales de construcción, plomería y electricidad para proyectos profesionales y del hogar.
            </p>
          </div>

          {/* Columna 2 */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Navegación</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-indigo-400 transition-colors">Inicio</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-indigo-400 transition-colors">Nosotros</Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-indigo-400 transition-colors">Catálogo de Productos</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-indigo-400 transition-colors">Contacto</Link>
              </li>
            </ul>
          </div>

          {/* Columna 3 */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Categorías</h4>
            <ul className="space-y-2 text-xs">
              <li>Herramientas Manuales y Eléctricas</li>
              <li>Plomería y Tuberías PVC</li>
              <li>Materiales de Construcción</li>
              <li>Pinturas y Acabados</li>
              <li>Electricidad y Cableado</li>
            </ul>
          </div>

          {/* Columna 4 */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Atención al Cliente</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-indigo-400" />
                <span>Av. Principal #45-12, Zona Comercial</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-indigo-400" />
                <span>+502 2345-6789</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-indigo-400" />
                <span>ventas@ferreteraexpress.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Ferretería Express - Todos los derechos reservados.</p>
          <p className="flex items-center space-x-1 mt-2 md:mt-0">
            <span>Diseñado con</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>para proyectos web modernos.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
