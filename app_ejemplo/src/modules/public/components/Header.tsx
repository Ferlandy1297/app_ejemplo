'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/modules/auth/context/AuthContext';
import { Wrench, User, LayoutDashboard, LogOut } from 'lucide-react';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const { user, isAuthenticated, openLoginModal, logout } = useAuth();

  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Nosotros', href: '/about' },
    { name: 'Productos', href: '/products' },
    { name: 'Contacto', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">

        {/* Logo Institucional */}
        <Link href="/" className="flex items-center space-x-2.5 shrink-0">
          <div className="p-2 bg-indigo-600 text-white rounded-xl shadow-sm">
            <Wrench className="w-5 h-5" />
          </div>
          <div className="hidden sm:block">
            <span className="text-lg font-bold text-slate-900 tracking-tight">Ferretería</span>
            <span className="text-lg font-bold text-indigo-600 tracking-tight">Express</span>
          </div>
        </Link>

        {/* Barra de Menú Principal (Siempre Visible) */}
        <nav className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto scrollbar-none py-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-xl whitespace-nowrap transition-all ${
                  isActive
                    ? 'text-indigo-600 bg-indigo-50/80 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Botón de Ingreso / Usuario en la Esquina Superior Derecha */}
        <div className="flex items-center space-x-2 shrink-0">
          {isAuthenticated && user ? (
            <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200/80 p-1 pl-2.5 rounded-2xl">
              <div className="hidden md:flex flex-col text-left">
                <span className="text-xs font-bold text-slate-800 truncate max-w-[120px]">{user.fullName}</span>
                <span className="text-[10px] font-medium text-slate-500">
                  {user.role === 'ADMIN' ? 'Admin' : 'Usuario'}
                </span>
              </div>

              <Link
                href="/dashboard"
                className="flex items-center space-x-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-all"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Panel</span>
              </Link>

              <button
                onClick={logout}
                title="Cerrar Sesión"
                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={openLoginModal}
              title="Ingresar"
              className="p-2 text-slate-700 hover:text-indigo-600 bg-slate-100 hover:bg-indigo-50 border border-slate-200/80 rounded-xl transition-all flex items-center space-x-1.5 font-medium text-xs sm:text-sm"
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
              <span className="hidden sm:inline">Ingresar</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
};
