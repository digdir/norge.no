import { Heading, Paragraph, Link, List } from '@digdir/designsystemet-react';
import { useLivshendelser } from '@packages/data-access/react-query/hooks';
import type { Livshendelse } from "@packages/types/cms";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function LivshendelseListe() {
  return (
    <QueryClientProvider client={queryClient}>
      <InnerLivshendelser />
    </QueryClientProvider>
  );
}

function InnerLivshendelser() {
  const { data, isLoading, error } = useLivshendelser();
  const livshendelser = data?.data ?? [];

  if (isLoading) {
    return (
      <div>
        <Heading data-size="md">Livshendelser</Heading>
        <Paragraph>Laster...</Paragraph>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Heading data-size="md">Livshendelser</Heading>
        <Paragraph>Ukjent feil ved henting.</Paragraph>
      </div>
    );
  }

  if (data?.error) {
    return (
      <div>
        <Heading data-size="md">Livshendelser</Heading>
        <Paragraph>Kunne ikke hente livshendelser ({data.error}).</Paragraph>
      </div>
    );
  }

  return (
    <div>
      <Heading data-size="md">Livshendelser</Heading>
      {livshendelser.length > 0 ? (
        <List.Unordered>
          {livshendelser.map((hendelse: Livshendelse) => (
            <List.Item key={hendelse.Slug}>
              <Link href={`/livshendelser/${hendelse.Slug}`}>{hendelse.Tittel}</Link>
            </List.Item>
          ))}
        </List.Unordered>
      ) : (
        <Paragraph>Ingen livshendelser funnet.</Paragraph>
      )}
    </div>
  );
}