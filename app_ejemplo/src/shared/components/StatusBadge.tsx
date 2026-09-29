'use client';

import React from 'react';

interface StatusBadgeProps {
  isActive: boolean;
  labelActive?: string;
  labelInactive?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  isActive,
  labelActive = 'Activo',
  labelInactive = 'Inactivo',
}) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-bold ${
        isActive
          ? 'bg-emerald-50 text-emerald-700'
          : 'bg-slate-100 text-slate-500'
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
          isActive ? 'bg-emerald-500' : 'bg-slate-400'
        }`}
      />
      {isActive ? labelActive : labelInactive}
    </span>
  );
};
