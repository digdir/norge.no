import { useQuery } from '@tanstack/react-query';
import type { Livshendelse } from '@packages/types/cms';

interface ApiResponse {
  data: Livshendelse[] | null;
  meta: any;
  error?: string;
}

async function fetchLivshendelser(): Promise<ApiResponse> {
  const res = await fetch('/api/cms/livshendelser', {
    headers: { Accept: 'application/json' },
  });

  if (!res.ok) {
    return { data: null, meta: null, error: `Error fetching: ${res.status}` };
  }

  let json: any;
  try {
    json = await res.json();
  } catch {
    return { data: null, meta: null, error: 'Invalid JSON from API' };
  }
  return { ...json,   error: json?.error };
}

export function useLivshendelser() {
  return useQuery<ApiResponse>({
    queryKey: ['livshendelser'],
    queryFn: fetchLivshendelser,
    staleTime: 1000 * 60, // 1 min
    retry: 1,
  });
}