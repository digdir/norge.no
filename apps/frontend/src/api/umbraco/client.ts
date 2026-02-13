import { mockUmbracoContent } from '../../pages/api/mocks/umbraco-content';

export const UMBRACO_API_URL = import.meta.env.UMBRACO_API_URL || 'https://your-umbraco-instance.com';
export const UMBRACO_API_KEY = import.meta.env.UMBRACO_API_KEY;

// Feature flag to toggle mock data (could be an environment variable)
const USE_MOCK_API = true; 

export async function fetchUmbracoContent(path: string) {
  if (USE_MOCK_API) {
    // Normalize path to match mock keys (remove trailing slash if present)
    const normalizedPath = path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path;
    const mockData = (mockUmbracoContent as any)[normalizedPath];
    
    if (mockData) {
      console.log(`[Mock API] Returning data for: ${normalizedPath}`);
      return Promise.resolve(mockData);
    }
    console.warn(`[Mock API] No data found for: ${normalizedPath}`);
  }

  const headers: HeadersInit = {
    'Accept-Language': 'nb-NO', // Default to Norwegian
  };

  if (UMBRACO_API_KEY) {
    headers['Api-Key'] = UMBRACO_API_KEY;
  }

  // Uses Umbraco Content Delivery API pattern
  const url = `${UMBRACO_API_URL}/api/v1/content/item?path=${encodeURIComponent(path)}`;

  const response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error(`Failed to fetch from Umbraco: ${response.statusText}`);
  }

  return await response.json();
}
