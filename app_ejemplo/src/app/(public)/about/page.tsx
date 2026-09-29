'use client';

import React from 'react';
import { Target, Eye, Award, Users, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

      {/* Header Sección */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Sobre Ferretería Express
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
          Más de 15 años brindando soluciones integrales en materiales de construcción, plomería, herramientas y acabados de alta durabilidad.
        </p>
      </div>

      {/* Misión y Visión */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl w-fit">
            <Target className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Nuestra Misión</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Suministrar a ingenieros, contratistas y familias los mejores insumos y herramientas del mercado, garantizando asesoría experta, precios competitivos y entregas oportunas.
          </p>
        </div>

        <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl w-fit">
            <Eye className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Nuestra Visión</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Ser la ferretería digital y física líder en la región, reconocida por la excelencia operativa, la innovación tecnológica en ventas y el compromiso ético con nuestros clientes.
          </p>
        </div>
      </div>

      {/* Valores */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold">Nuestros Valores Fundamentales</h2>
          <p className="text-slate-400 text-sm">Principios que guían cada transacción y atención al cliente.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex items-start space-x-3 p-4 bg-white/5 rounded-2xl border border-white/10">
            <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-white text-sm">Calidad Garantizada</h4>
              <p className="text-xs text-slate-400 mt-1">Solo comercializamos marcas verificadas con certificaciones de seguridad.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 bg-white/5 rounded-2xl border border-white/10">
            <Award className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-white text-sm">Honestidad y Transparencia</h4>
              <p className="text-xs text-slate-400 mt-1">Precios justos sin cargos ocultos en cada factura o cotización.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-4 bg-white/5 rounded-2xl border border-white/10">
            <Users className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-white text-sm">Enfoque al Cliente</h4>
              <p className="text-xs text-slate-400 mt-1">Atención personalizada adaptada a las necesidades de cada proyecto.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
