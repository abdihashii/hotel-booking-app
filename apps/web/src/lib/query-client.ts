import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Data remains fresh for 5 minutes
      staleTime: 1000 * 60 * 5,

      // Refetches stale queries when the window regains focus. Generally
      // good for UX.
      refetchOnWindowFocus: true,

      // Refetches stale queries when the component is mounted. Generally
      // good for UX.
      refetchOnMount: false,

      // Number of times to retry a failed query.
      retry: 2,
    },
  },
});
