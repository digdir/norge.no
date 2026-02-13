import {Heading, Paragraph} from '@digdir/designsystemet-react';
import {ArrowRightIcon} from '@navikt/aksel-icons';
import styles from './LatestNewsBlock.module.css';

export interface LatestNewsBlockProps {
  heading?: string;
  news: Array<{
    pageName: string;
    mainIntro: string;
    url: string;
    language?: string;
  }>;
  newsLocation?: {
    url: string;
    text?: string;
  };
}

export const LatestNewsBlock = ({
  heading,
  news,
  newsLocation,
}: LatestNewsBlockProps) => {
  return (
    <div className={styles.container}>
      <section className={styles.articleList}>
        {heading && (
          <Heading
            level={2}
            className={styles.heading}
          >
            {heading}
          </Heading>
        )}

        {news.map((article, idx) => (
          <article
            key={idx}
            className={styles.article}
            lang={article.language}
          >
            <Heading
              level={3}
              className={styles.articleTitle}
            >
              <a
                href={article.url}
                className={styles.linkTitle}
              >
                {article.pageName}
              </a>
            </Heading>
            <Paragraph className={styles.intro}>{article.mainIntro}</Paragraph>
          </article>
        ))}

        {newsLocation?.url && (
          <div className={styles.linkWrapper}>
            <a
              href={newsLocation.url}
              className={styles.linkFeatured}
            >
              {newsLocation.text || 'Vis alle nyheter'}
              <ArrowRightIcon
                aria-hidden="true"
                title="arrow forward"
              />
            </a>
          </div>
        )}
      </section>
    </div>
  );
};
