'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Cotización de Materiales',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Contacto y Cotizaciones
        </h1>
        <p className="text-slate-600 text-sm">
          ¿Necesitas una cotización por volumen o asesoría para tu obra? Escríbenos y un ejecutivo te atenderá de inmediato.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div className="space-y-4 lg:col-span-1">
          <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-start space-x-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-slate-800 text-sm">Ubicación Principal</h4>
              <p className="text-xs text-slate-500">Av. Principal #45-12, Zona Comercial, Ciudad de Guatemala</p>
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-start space-x-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-slate-800 text-sm">Teléfono & WhatsApp</h4>
              <p className="text-xs text-slate-500">+502 2345-6789 / +502 5555-0199</p>
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-start space-x-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-slate-800 text-sm">Correo Electrónico</h4>
              <p className="text-xs text-slate-500">ventas@ferreteraexpress.com</p>
            </div>
          </div>

          <div className="p-6 bg-slate-900 text-white rounded-2xl space-y-3">
            <div className="flex items-center space-x-2 text-indigo-400">
              <Clock className="w-4 h-4" />
              <span className="font-semibold text-xs">Horario de Atención</span>
            </div>
            <p className="text-xs text-slate-300">
              Lunes a Viernes: 7:00 AM - 6:00 PM<br />
              Sábados: 7:00 AM - 1:00 PM
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">¡Mensaje Enviado con Éxito!</h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                Gracias por contactar a Ferretería Express. Nos pondremos en contacto contigo en breve a través de {formData.email}.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 bg-indigo-600 text-white text-xs font-semibold rounded-xl hover:bg-indigo-700 transition-all"
              >
                Enviar Otro Mensaje
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="text-lg font-bold text-slate-900">Envíanos un Mensaje</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Nombre Completo</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ej. Juan Pérez"
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Correo Electrónico</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="juan@ejemplo.com"
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Teléfono</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+502 5555-0000"
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Asunto</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                  >
                    <option>Cotización de Materiales</option>
                    <option>Consulta de Stock</option>
                    <option>Ventas al Mayor</option>
                    <option>Soporte Técnico</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Mensaje o Lista de Insumos</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Detalla los productos o cantidades que necesitas..."
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-sm transition-all flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Enviar Solicitud</span>
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
}
