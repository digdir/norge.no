interface ServerFetchProps {
  strapiApiUrl: string;
  strapiApiKey: string;
  endpoint: string;
  query?: Record<string, string>;
  wrappedByKey?: string;
  wrappedByList?: boolean;
  populate?: string | string[];
}

/**
 * Fetches data from the Strapi API using server-side credentials.
 */
export async function fetchStrapiDataFromServer<T>({
  strapiApiUrl,
  strapiApiKey,
  endpoint,
  query,
  wrappedByKey,
  wrappedByList,
  populate,
}: ServerFetchProps): Promise<T> {
  if (endpoint.startsWith('/')) {
    endpoint = endpoint.slice(1);
  }

  const url = new URL(`${strapiApiUrl}/api/${endpoint}`);

  if (populate) {
    if (Array.isArray(populate)) {
      populate.forEach((p) => url.searchParams.append('populate', p));
    } else {
      url.searchParams.append('populate', populate);
    }
  } else {
    url.searchParams.append('populate', 'icon');
  }

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  const headers = {
    Authorization: `Bearer ${strapiApiKey}`,
    'Content-Type': 'application/json',
  };

  const res = await fetch(url.toString(), {headers});

  if (!res.ok) {
    const errorBody = await res.text();
    console.error(
      `Strapi API Error (${res.status}) from ${url.toString()}: ${errorBody}`
    );
    throw new Error(
      `Failed to fetch from Strapi (${url.toString()}): ${res.status} ${
        res.statusText
      }`
    );
  }

  let data = await res.json();

  if (wrappedByKey) {
    data = data[wrappedByKey];
  }

  if (wrappedByList && Array.isArray(data)) {
    data = data[0];
  }

  return data as T;
}
