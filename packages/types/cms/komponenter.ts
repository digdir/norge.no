export interface TekstBlokk {
  __component: 'blokk.tekst';
  id: number;
  Innhold: any; // Strapi's Blocks-type er kompleks, 'any' er en start
}

export interface FaqBlokk {
  __component: 'blokk.faq';
  id: number;
  Sporsmal: string;
  Svar: any;
}

export interface AdvarselBlokk {
  __component: 'blokk.advarsel';
  id: number;
  Tittel?: string;
  Innhold: string;
  Type: 'Informasjon' | 'Advarsel' | 'Viktig';
}

export type Komponent = TekstBlokk | FaqBlokk | AdvarselBlokk;