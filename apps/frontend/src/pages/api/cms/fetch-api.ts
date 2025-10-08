export interface StrapiFetchProps {
  strapiApiUrl: string;
  strapiApiKey: string;
  endpoint: string;
  rawQuery?: string;
  query?: Record<string, string>;
  wrappedByKey?: string;
  wrappedByList?: boolean;
  populate?: string | string[];
}

export async function fetchStrapiDataFromServer<T>({
  strapiApiUrl,
  strapiApiKey,
  endpoint,
  rawQuery,
  wrappedByKey,
  wrappedByList,
  populate,
}: StrapiFetchProps): Promise<T> {
  if (endpoint.startsWith('/')) {
    endpoint = endpoint.slice(1);
  }

  const url = new URL(`${strapiApiUrl}/api/${endpoint}`);
  const searchParams = new URLSearchParams(rawQuery);

  if (populate) {
    if (Array.isArray(populate)) {
      populate.forEach((p, index) => searchParams.append(`populate[${index}]`, p));
    } else {
      searchParams.append('populate', populate);
    }
  }

  url.search = searchParams.toString();

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

  let data: StrapiFetchProps = await res.json();

  if (wrappedByKey) {
    data = data[wrappedByKey] as StrapiFetchProps;
  }

  if (wrappedByList && Array.isArray(data)) {
    data = data[0];
  }

  return data as T;
}
