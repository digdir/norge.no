import type { Schema, Struct } from '@strapi/strapi';

export interface BlokkAdvarsel extends Struct.ComponentSchema {
  collectionName: 'components_blokk_advarsels';
  info: {
    displayName: 'Advarsel';
  };
  attributes: {
    Innhold: Schema.Attribute.Text;
    Tittel: Schema.Attribute.String;
    Type: Schema.Attribute.Enumeration<['Informasjon', 'Advarsel', 'Viktig']> &
      Schema.Attribute.DefaultTo<'Informasjon'>;
  };
}

export interface BlokkFaq extends Struct.ComponentSchema {
  collectionName: 'components_blokk_faqs';
  info: {
    displayName: 'FAQ';
  };
  attributes: {
    Sporsmal: Schema.Attribute.String;
    Svar: Schema.Attribute.Blocks;
  };
}

export interface BlokkTekst extends Struct.ComponentSchema {
  collectionName: 'components_blokk_teksts';
  info: {
    displayName: 'Tekst';
  };
  attributes: {
    Innhold: Schema.Attribute.Blocks;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blokk.advarsel': BlokkAdvarsel;
      'blokk.faq': BlokkFaq;
      'blokk.tekst': BlokkTekst;
    }
  }
}
