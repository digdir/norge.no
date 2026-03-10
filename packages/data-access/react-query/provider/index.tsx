import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../query-client/index.tsx';

interface QueryProviderProps {
  children: React.ReactNode;
}

// This component no longer takes a 'client' prop. It uses the imported singleton.
export function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}