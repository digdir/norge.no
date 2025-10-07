import type { Komponent } from './komponenter.ts';

// Forenklet type for relasjoner for å unngå sirkulære avhengigheter i starten

interface AnsvarligEtat {
  id: number;
  Navn: string;
  Nettside?: string;
  LogoUrl?: string;
  Steger?: Steg[];
}

interface Merkelapp {
  id: number;
  Navn: string;
  Slug?: string;
  Beskrivelse?: string;
  Steger?: Steg[];
}
export interface Steg {
  id: number;
  Tittel: string;
  Slug: string;
  Sammendrag?: string;
  Innhold: Komponent[];
  AnsvarligEtat: AnsvarligEtat;
  Merkelapper: Merkelapp[];
}