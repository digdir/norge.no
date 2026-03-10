import { QueryClient } from '@tanstack/react-query';

// Create the single instance here. Do not export a function.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minute cache
      refetchOnWindowFocus: false,
    },
  },
});