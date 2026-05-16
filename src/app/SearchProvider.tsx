'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  debouncedQuery: string;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const isInitializing = useRef(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const updateURL = useCallback((query: string) => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const currentQ = params.get('q') || '';
    if (currentQ === query) return;
    
    if (query) {
      params.set('q', query);
    } else {
      params.delete('q');
    }
    params.delete('page');
    const queryString = params.toString();
    const newUrl = queryString ? `/?${queryString}` : '/';
    router.push(newUrl, { scroll: false });
  }, [router]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const initialQuery = params.get('q') || '';
      setSearchQuery(initialQuery);
      setDebouncedQuery(initialQuery);
      isInitializing.current = false;
    }
  }, []);

  useEffect(() => {
    if (!isInitializing.current) {
      updateURL(debouncedQuery);
    }
  }, [debouncedQuery, updateURL]);

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery, debouncedQuery }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}