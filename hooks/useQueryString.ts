'use client';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

/**
 * Récupère la query string de l'URL
 * @return {string}
 */
export default function useQueryString(): string {
  const searchParams = useSearchParams();
  const query: string = useMemo(() => {
    return searchParams.toString() ? `?${searchParams.toString()}` : '';
  }, [searchParams]);
  return query;
}
