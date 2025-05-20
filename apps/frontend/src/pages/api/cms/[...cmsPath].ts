import type {APIRoute} from 'astro';
import {fetchStrapiDataFromServer} from './fetch-api'; // No .ts needed in import

export const GET: APIRoute = async ({params, request, locals}) => {
  // params might not be needed
  const runtime = locals.runtime;

  if (!runtime?.env?.STRAPI_API_URL || !runtime?.env?.STRAPI_API_KEY) {
    // ... error handling ...
    return new Response(
      JSON.stringify({error: 'Server configuration error.'}),
      {status: 500}
    );
  }

  const strapiApiUrl = runtime.env.STRAPI_API_URL as string;
  const strapiApiKey = runtime.env.STRAPI_API_KEY as string;
  const endpoint = params.cmsPath; // Hardcode or derive if this file handles multiple fixed endpoints

  const requestUrl = new URL(request.url);
  let clientPopulate: string | string[] | undefined =
    requestUrl.searchParams.getAll('populate'); // getAll returns array
  if (clientPopulate.length === 0) clientPopulate = undefined;
  else if (clientPopulate.length === 1) clientPopulate = clientPopulate[0]; // if only one, make it a string

  const clientWrappedByKey =
    requestUrl.searchParams.get('wrappedByKey') || undefined;
  const clientWrappedByList =
    requestUrl.searchParams.get('wrappedByList') === 'true';

  // Construct the query object for other parameters
  const clientQuery: Record<string, string> = {};
  requestUrl.searchParams.forEach((value, key) => {
    if (!['populate', 'wrappedByKey', 'wrappedByList'].includes(key)) {
      clientQuery[key] = value;
    }
  });
  if (clientPopulate === undefined) {
    clientPopulate = 'icon'; // Default populate from your hook if not overridden
  }

  try {
    const data = await fetchStrapiDataFromServer<any>({
      strapiApiUrl,
      strapiApiKey,
      endpoint,
      query: clientQuery,
      wrappedByKey: clientWrappedByKey,
      wrappedByList: clientWrappedByList,
      populate: clientPopulate,
    });
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {'Content-Type': 'application/json'},
    });
  } catch (error) {
    // ... error handling ...
    return new Response(JSON.stringify({error: 'Failed to retrieve data.'}), {
      status: 502,
    });
  }
};
