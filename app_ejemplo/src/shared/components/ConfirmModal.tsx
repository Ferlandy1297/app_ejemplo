'use client';

import React from 'react';
import { Trash2 } from 'lucide-react';

interface ConfirmModalProps {
  title: string;
  description: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  danger?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  title,
  description,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  onConfirm,
  onCancel,
  danger = true,
}) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
      }}
      onClick={onCancel}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '22rem',
          backgroundColor: '#ffffff',
          borderRadius: '1rem',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.35)',
          border: '1px solid #f1f5f9',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 space-y-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2.5 rounded-xl ${danger ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'}`}>
              <Trash2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">{title}</h3>
              <p className="text-xs text-slate-500">Esta acción no se puede deshacer.</p>
            </div>
          </div>

          <div className="text-sm text-slate-600">{description}</div>

          <div className="flex items-center justify-end space-x-2 pt-2">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              {cancelLabel}
            </button>
            <button
              onClick={onConfirm}
              className={`px-4 py-2 text-xs font-semibold text-white rounded-xl transition-colors ${
                danger
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-amber-500 hover:bg-amber-600'
              }`}
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
