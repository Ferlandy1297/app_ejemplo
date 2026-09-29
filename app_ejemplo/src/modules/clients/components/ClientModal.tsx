'use client';

import React, { useState, useEffect } from 'react';
import { X, User, Mail, Phone, MapPin, FileText, Save, Loader2 } from 'lucide-react';
import { ClientModel } from '../models/client.model';

interface ClientFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  nit: string;
  isActive: boolean;
}

interface ClientModalProps {
  mode: 'create' | 'edit';
  client?: ClientModel;
  onClose: () => void;
  onSave: (data: ClientFormData) => void;
  isSaving?: boolean;
}

export const ClientModal: React.FC<ClientModalProps> = ({
  mode,
  client,
  onClose,
  onSave,
  isSaving = false,
}) => {
  const [form, setForm] = useState<ClientFormData>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    nit: '',
    isActive: true,
  });

  useEffect(() => {
    if (mode === 'edit' && client) {
      setForm({
        fullName: client.fullName,
        email: client.email,
        phone: client.phone,
        address: client.address,
        nit: client.nit,
        isActive: client.isActive,
      });
    }
  }, [mode, client]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '32rem',
          backgroundColor: '#ffffff',
          borderRadius: '1rem',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.35)',
          border: '1px solid #f1f5f9',
          overflow: 'hidden',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800">
                {mode === 'create' ? 'Nuevo Cliente' : 'Editar Cliente'}
              </h3>
              <p className="text-xs text-slate-500">
                {mode === 'create' ? 'Completa los datos del cliente' : `Editando: ${client?.fullName}`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Nombre */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Nombre Completo / Razón Social</label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                name="fullName"
                required
                value={form.fullName}
                onChange={handleChange}
                placeholder="Ej: Cliente Demo o Empresa Demo"
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Correo Electrónico</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="cliente@empresa.com"
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Teléfono y NIT */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Teléfono</label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  name="phone"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="5555-1234"
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">NIT</label>
              <div className="relative">
                <FileText className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  name="nit"
                  required
                  value={form.nit}
                  onChange={handleChange}
                  placeholder="1234567-8"
                  className="w-full pl-9 pr-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                />
              </div>
            </div>
          </div>

          {/* Dirección */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">Dirección</label>
            <div className="relative">
              <MapPin className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                name="address"
                required
                value={form.address}
                onChange={handleChange}
                placeholder="Zona 1, Ciudad de Guatemala"
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Estado */}
          {mode === 'edit' && (
            <label className="flex items-center space-x-3 cursor-pointer py-1">
              <input
                type="checkbox"
                name="isActive"
                checked={form.isActive}
                onChange={handleChange}
                className="w-4 h-4 accent-indigo-600 rounded"
              />
              <span className="text-xs font-semibold text-slate-700">Cliente Activo</span>
            </label>
          )}

          {/* Botones */}
          <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors disabled:opacity-50 shadow-sm"
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              <span>{mode === 'create' ? 'Crear Cliente' : 'Guardar Cambios'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
