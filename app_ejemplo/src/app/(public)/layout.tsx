'use client';

import React from 'react';
import { Header } from '@/modules/public/components/Header';
import { Footer } from '@/modules/public/components/Footer';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
