import {useQuery, type UseQueryResult} from '@tanstack/react-query';
import {queryClient} from '@stores/query';
import {useStore} from '@nanostores/react';
import type {CMSService} from '@packages/types';

type ErrorData = {details?: string; error?: string};

const fetchServicesFromAPI = async (): Promise<CMSService[]> => {
  const params = new URLSearchParams({
    populate: 'icon',
    wrappedByKey: 'data',
  });

  const response = await fetch(`/api/cms/services?${params.toString()}`);

  if (!response.ok) {
    let errorDetails = `Error fetching services: ${response.status} ${response.statusText}`;
    try {
      const errorData: ErrorData = await response.json();
      if (typeof errorData === 'object' && errorData !== null) {
        errorDetails = errorData.details || errorData.error || errorDetails;
      }
    } catch (e) {
      console.log('Response was not JSON:', e);
    }
    throw new Error(errorDetails);
  }
  return response.json() as Promise<CMSService[]>;
};

export const useServices = (): UseQueryResult<CMSService[], Error> => {
  const client = useStore(queryClient);

  return useQuery<CMSService[], Error, CMSService[], ReadonlyArray<string>>(
    {
      queryKey: ['services'],
      queryFn: fetchServicesFromAPI,
      staleTime: 1000 * 60 * 5, // 5 minutes caching
    },
    client
  );
};
