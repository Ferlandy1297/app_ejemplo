'use client';

import React from 'react';
import { ToggleLeft, ToggleRight } from 'lucide-react';

interface ToggleStatusButtonProps {
  isActive: boolean;
  onToggle: () => void;
  titleActive?: string;
  titleInactive?: string;
}

export const ToggleStatusButton: React.FC<ToggleStatusButtonProps> = ({
  isActive,
  onToggle,
  titleActive = 'Desactivar',
  titleInactive = 'Activar',
}) => {
  return (
    <button
      onClick={onToggle}
      title={isActive ? titleActive : titleInactive}
      className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
    >
      {isActive ? (
        <ToggleRight className="w-4 h-4 text-emerald-500" />
      ) : (
        <ToggleLeft className="w-4 h-4" />
      )}
    </button>
  );
};
