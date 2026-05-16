'use client';

import { SearchProvider } from './SearchProvider';
import { Header } from './Header';
import { Footer } from './Footer';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <SearchProvider>
      <Header />
      <div className="min-h-[calc(100vh-64px)]">{children}</div>
      <Footer />
    </SearchProvider>
  );
}