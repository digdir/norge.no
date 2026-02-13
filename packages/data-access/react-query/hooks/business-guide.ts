import { useQuery } from '@tanstack/react-query';
import { fetchUmbracoContent } from '../../../../apps/frontend/src/api/umbraco/client.ts';
import type { BusinessGuidePage } from '@packages/types/cms';

export function useBusinessGuide(path: string) {
  return useQuery<BusinessGuidePage>({
    queryKey: ['umbraco', 'business-guide', path],
    queryFn: () => fetchUmbracoContent(path),
    staleTime: 1000 * 60 * 5,
  });
}
