'use client';

import React from 'react';

export interface TableColumn<T> {
  key: string;
  header: string;
  /** Función de renderizado de celda */
  render: (item: T) => React.ReactNode;
  /** Ocultar columna en pantallas menores a este breakpoint */
  hideBelow?: 'md' | 'lg';
  /** Alineación del contenido de la columna */
  align?: 'left' | 'center' | 'right';
  /** Clases CSS adicionales para la celda */
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  keyExtractor: (item: T) => string;
  /** Slot de acciones por fila */
  renderActions?: (item: T) => React.ReactNode;
  /** Alineación de la columna de acciones */
  actionsAlign?: 'left' | 'center' | 'right';
  emptyMessage?: string;
}

const alignClass = (align?: 'left' | 'center' | 'right') => {
  if (align === 'center') return 'text-center';
  if (align === 'right') return 'text-right';
  return 'text-left';
};

export function DataTable<T>({
  data,
  columns,
  keyExtractor,
  renderActions,
  actionsAlign = 'center',
  emptyMessage = 'No se encontraron registros.',
}: DataTableProps<T>) {
  const colSpan = columns.length + (renderActions ? 1 : 0);

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-indigo-600">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={[
                    'px-5 py-3.5 text-xs font-bold text-white uppercase tracking-wider',
                    alignClass(col.align),
                    col.hideBelow === 'md' ? 'hidden md:table-cell' : '',
                    col.hideBelow === 'lg' ? 'hidden lg:table-cell' : '',
                    col.className ?? '',
                  ].join(' ')}
                >
                  {col.header}
                </th>
              ))}
              {renderActions && (
                <th className={`px-5 py-3.5 text-xs font-bold text-white uppercase tracking-wider ${alignClass(actionsAlign)}`}>
                  Acciones
                </th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-50">
            {data.length === 0 ? (
              <tr>
                <td colSpan={colSpan} className="text-center py-12 text-slate-400 text-sm">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={keyExtractor(item)} className="hover:bg-slate-50/60 transition-colors">
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={[
                        'px-5 py-4',
                        alignClass(col.align),
                        col.hideBelow === 'md' ? 'hidden md:table-cell' : '',
                        col.hideBelow === 'lg' ? 'hidden lg:table-cell' : '',
                        col.className ?? '',
                      ].join(' ')}
                    >
                      {col.render(item)}
                    </td>
                  ))}
                  {renderActions && (
                    <td className={`px-5 py-4 ${alignClass(actionsAlign)}`}>
                      <div className={`flex items-center space-x-1 ${actionsAlign === 'center' ? 'justify-center' : actionsAlign === 'right' ? 'justify-end' : 'justify-start'}`}>
                        {renderActions(item)}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
