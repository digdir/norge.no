import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { queryClient } from '../query-client/index.tsx';
import type { Livshendelse } from '@packages/types/cms';

const qs = (queryParams: object) => new URLSearchParams(queryParams as Record<string, string>).toString();

const fetchLivshendelseBySlug = async (slug: string): Promise<Livshendelse> => {
  const populateQuery = qs({
    'filters[Slug][$eq]': slug,
    'populate[Steger][populate][0]': 'AnsvarligEtat',
    'populate[Steger][populate][1]': 'Merkelapper',
    'populate[Steger][populate][2]': 'Innhold',
  });

  const response = await fetch(`/api/cms/livshendelser?${populateQuery}`);

  if (!response.ok) {
    throw new Error(`Error fetching livshendelse: ${response.statusText}`);
  }

  const jsonResponse = await response.json();

  if (jsonResponse.data && jsonResponse.data.length > 0) {
    return jsonResponse.data[0] as Livshendelse;
  }

  throw new Error(`Livshendelse med slug '${slug}' ble ikke funnet.`);
};

export const useLivshendelse = (slug: string): UseQueryResult<Livshendelse, Error> => {
  return useQuery<Livshendelse, Error, Livshendelse, readonly [string, string]>(
    {
      queryKey: ['livshendelse', slug],
      queryFn: () => fetchLivshendelseBySlug(slug),
      enabled: !!slug,
    },
    queryClient,
  );
};