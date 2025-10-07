import type { Steg } from './steg.ts';

export interface Livshendelse {
  id: number;
  Tittel: string;
  Slug: string;
  Beskrivelse?: string;
  Steger: Steg[];
}