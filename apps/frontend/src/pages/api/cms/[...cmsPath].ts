import {safeFetchStrapiData} from './fetch-api.ts';

import type {APIRoute} from 'astro';

export const GET: APIRoute = async ({params, request, locals}) => {
  const runtime = locals.runtime;

  if (!runtime?.env?.STRAPI_API_URL || !runtime?.env?.STRAPI_API_KEY) {
    return new Response(
      JSON.stringify({error: 'Server configuration error.'}),
      {status: 500}
    );
  }

  const strapiApiUrl = runtime.env.STRAPI_API_URL as string;
  const strapiApiKey = runtime.env.STRAPI_API_KEY as string;

  if (!params.cmsPath) {
    return new Response(JSON.stringify({error: 'CMS path is missing.'}), {
      status: 400,
    });
  }

  const endpoint: string = params.cmsPath;

  const requestUrl = new URL(request.url);
  let clientPopulate: string | string[] | undefined =
    requestUrl.searchParams.getAll('populate');
  if (clientPopulate.length === 0) clientPopulate = undefined;
  else if (clientPopulate.length === 1) clientPopulate = clientPopulate[0];

  const clientWrappedByKey =
    requestUrl.searchParams.get('wrappedByKey') || undefined;
  const clientWrappedByList =
    requestUrl.searchParams.get('wrappedByList') === 'true';
  const clientQueryString = requestUrl.search.substring(1);

  const clientQuery: Record<string, string> = {};
  requestUrl.searchParams.forEach((value, key) => {
    if (!['populate', 'wrappedByKey', 'wrappedByList'].includes(key)) {
      clientQuery[key] = value;
    }
  });
  
  const result = await safeFetchStrapiData<any>({
    strapiApiUrl,
    strapiApiKey,
    endpoint,
    rawQuery: clientQueryString,
    wrappedByKey: clientWrappedByKey,
    wrappedByList: clientWrappedByList,
    populate: clientPopulate,
  });
  return new Response(
    JSON.stringify({ ...result.data, error: result.error }),
    {
      status: result.status,
      headers: { 'Content-Type': 'application/json' },
    }
  );
};
