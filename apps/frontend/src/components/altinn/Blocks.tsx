// Placeholder for DoYouNeedHelp block based on altinn design
import React from 'react';
import {Heading, Paragraph} from '@digdir/designsystemet-react';
import styles from './Blocks.module.css';

export const LatestNewsBlock = ({heading, news, newsLocation}) => {
  return (
    <div className={styles.newsContainer}>
      <Heading
        level={2}
        className={styles.newsHeading}
      >
        {heading}
      </Heading>
      {news.map((article, idx) => (
        <article
          key={idx}
          className={styles.newsArticle}
        >
          <Heading
            level={3}
            className={styles.newsTitle}
          >
            <a
              href={article.url}
              className={styles.newsLink}
            >
              {article.pageName}
            </a>
          </Heading>
          <Paragraph className={styles.newsIntro}>
            {article.mainIntro}
          </Paragraph>
        </article>
      ))}
      <a
        href={newsLocation.url}
        className={styles.newsArchiveLink}
      >
        Vis alle nyheter <span>&rarr;</span>
      </a>
    </div>
  );
};

export const DoYouNeedHelpBlock = ({
  heading,
  description,
  phoneNumber,
  emailLinkText,
  image,
}) => {
  return (
    <div className={styles.helpContainer}>
      <div className={styles.helpCard}>
        {image && (
          <div className={styles.helpImageContainer}>
            <img
              src={image.url}
              alt={image.altText || ''}
              className={styles.helpImage}
            />
          </div>
        )}
        <div className={styles.helpContent}>
          <Heading
            level={2}
            className={styles.helpHeading}
          >
            {heading}
          </Heading>
          <Paragraph className={styles.helpText}>{description}</Paragraph>

          <div className={styles.helpLinks}>
            <a
              href={`tel:+47${phoneNumber.replace(/\s/g, '')}`}
              className={styles.helpLink}
            >
              <span>📱</span> {/* Placeholder icon, replace with SVG */}
              <span>{phoneNumber}</span>
            </a>

            {emailLinkText && (
              <a
                href="javascript:void(0)"
                className={styles.helpLink}
              >
                <span>✉️</span> {/* Placeholder icon, replace with SVG */}
                <span>{emailLinkText}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
