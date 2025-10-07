import { Alert, Details, Heading, Paragraph, Tag } from '@digdir/designsystemet-react';
import type { Steg, Komponent } from '@packages/types/cms';
import styles from './style.module.css';

const RenderKomponent = ({ komp }: { komp: Komponent }) => {
  switch (komp.__component) {
    case 'blokk.tekst':
      return (
        <Paragraph>
          {komp.Innhold?.[0]?.children?.[0]?.text || 'Tekstblokk innhold mangler'}
        </Paragraph>
      );

    case 'blokk.faq':
      return (
        <Details>
          <Details.Summary>{komp.Sporsmal}</Details.Summary>
          <Details.Content>
             {komp.Svar?.[0]?.children?.[0]?.text || 'Svar mangler'}
          </Details.Content>
        </Details>
      );

    case 'blokk.advarsel': {
      return (
        <Alert data-color={komp.Type !== 'Informasjon' ? 'warning' : 'info'}>
          {komp.Tittel && <Heading level={3} data-size="xs">{komp.Tittel}</Heading>}
          <Paragraph>{komp.Innhold}</Paragraph>
        </Alert>
      );
    }
    default:
      return null;
  }
};

export const LivshendelseSteg = ({ steg, index }: { steg: Steg, index: number }) => {
  const { Tittel, Sammendrag, Innhold, AnsvarligEtat, Merkelapper } = steg;
  return (
    <div className={styles.stegContainer} id={steg.Slug}>
      <Heading level={2}>{index}. {Tittel}</Heading>
      {Sammendrag && <Paragraph className={styles.sammendrag}>{Sammendrag}</Paragraph>}
      <div className={styles.innhold}>
        {Innhold.map((komp) => (
          <RenderKomponent key={`${komp.__component}-${komp.id}`} komp={komp} />
        ))}
      </div>
       <div className={styles.stegFooter}>
            {AnsvarligEtat && (
                <span>Ansvarlig: {AnsvarligEtat.Navn}</span>
            )}
            {Merkelapper && Merkelapper.length > 0 && (
                <div className={styles.merkelapper}>
                  <span>Merkelapper: </span>
                    {Merkelapper.map((merkelapp) => (
                        <Tag key={merkelapp.id}>
                            {merkelapp.Navn}
                        </Tag>
                    ))}
                </div>
            )}
       </div>
    </div>
  );
};