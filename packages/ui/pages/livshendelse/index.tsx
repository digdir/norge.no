import {
  Heading,
  Link,
  List,
  ListItem,
  Paragraph,
} from "@digdir/designsystemet-react";
import { LivshendelseSteg } from "../../components//livshendelse-steg/index.tsx";
import { useLivshendelse } from "@packages/data-access/react-query/hooks";

import type { Steg } from "@packages/types/cms";
import styles from "./style.module.css";

export const Livshendelse = ({ slug }: { slug: string }) => {
  const { data, isLoading, error } = useLivshendelse(slug);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (isLoading) return <p>Laster livshendelse...</p>;
  if (error) return <p>Feil: {error.message}</p>;
  if (!data) return <p>Fant ingen data for denne livshendelsen.</p>;

  const { Tittel, Beskrivelse, Steger } = data;

  return (
    <article>
      <section className={styles.header}>
        <Heading level={1} data-size="lg">{Tittel}</Heading>
        {Beskrivelse && <Paragraph>{Beskrivelse}</Paragraph>}
      </section>

      <section className={styles.tableOfContents}>
        <List.Ordered>
          {Steger.map((steg: Steg) => (
            <ListItem key={steg.id}>
              <Link
                href={`#${steg.Slug}`}
                onClick={(e) => handleLinkClick(e, steg.Slug)}
              >
                {steg.Tittel}
              </Link>
            </ListItem>
          ))}
        </List.Ordered>
      </section>

      <section>
        {Steger.map((steg: Steg, i: number) => (
          <LivshendelseSteg key={steg.id} steg={steg} index={i + 1} />
        ))}
      </section>
    </article>
  );
};
