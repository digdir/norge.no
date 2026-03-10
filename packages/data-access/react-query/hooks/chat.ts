import { useMutation } from '@tanstack/react-query';
import { queryClient } from "../query-client/index.tsx";

type Structure = 'structured' | 'unstructured';

interface IPostQueryArgs {
  question: string;
  structure: Structure;
  assistantApiUrl: string;
  sessionId?: string;
}

export interface Citation {
  title: string;
  path: string;
  type: string;
}

export interface IApiResponse {
  response: string;
  session_id: string;
  citations?: Citation[];
}

async function postQuery({
  question,
  structure,
  assistantApiUrl,
  sessionId,
}: IPostQueryArgs): Promise<IApiResponse> {
  const CHAT_ASSISTANT_API_URL = `${assistantApiUrl}/api/chat-query/`;
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (sessionId) {
    headers['x-session-id'] = sessionId;
  }

  const response = await fetch(CHAT_ASSISTANT_API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({ question, structure }),
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }
  const data = await response.json();
  return data;
}

export function useChatMutation() {
  return useMutation<IApiResponse, Error, IPostQueryArgs>({
    mutationFn: postQuery,
  },
  queryClient
)};