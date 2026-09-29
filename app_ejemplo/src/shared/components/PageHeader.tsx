'use client';

import React from 'react';
import { Plus, LucideIcon } from 'lucide-react';

interface PageHeaderProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  icon: Icon,
  title,
  subtitle,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="flex items-center justify-between">
      {/* Título e ícono */}
      <div className="flex items-center space-x-3">
        <div className="p-2.5 bg-indigo-100 text-indigo-600 rounded-xl">
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl font-extrabold text-slate-900">{title}</h1>
          {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
      </div>

      {/* Botón de acción: sólo ícono en móvil, texto completo en sm+ */}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="flex items-center space-x-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs font-semibold rounded-xl transition-all"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
