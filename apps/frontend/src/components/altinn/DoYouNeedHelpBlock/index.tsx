import {Heading, Paragraph} from '@digdir/designsystemet-react';
import {MobileIcon, PaperplaneIcon} from '@navikt/aksel-icons';
import styles from './DoYouNeedHelpBlock.module.css';

export interface DoYouNeedHelpBlockProps {
  heading?: string;
  description?: string;
  phoneNumber?: string;
  emailLinkText?: string;
  email?: string;
  image?: {
    url: string;
    altText?: string;
  };
  showContactFormButton?: boolean;
}

export const DoYouNeedHelpBlock = ({
  heading,
  description,
  phoneNumber,
  emailLinkText,
  email,
  image,
  showContactFormButton,
}: DoYouNeedHelpBlockProps) => {
  // Helper to strip spaces for tel: link
  const phoneHref = phoneNumber
    ? `tel:+47${phoneNumber.replace(/\s/g, '')}`
    : undefined;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {image && (
          <div className={styles.media}>
            <img
              src={image.url}
              alt={image.altText || ''}
              className={styles.image}
            />
          </div>
        )}

        <div className={styles.content}>
          {heading && (
            <Heading
              level={2}
              className={styles.heading}
            >
              {heading}
            </Heading>
          )}
          {description && (
            <Paragraph className={styles.description}>{description}</Paragraph>
          )}

          <div className={styles.links}>
            {phoneNumber && (
              <a
                href={phoneHref}
                className={styles.linkIcon}
              >
                <MobileIcon
                  aria-hidden="true"
                  className={styles.icon}
                />
                <span>{phoneNumber}</span>
              </a>
            )}

            {email && emailLinkText && (
              <a
                href={`mailto:${email}`}
                className={styles.linkIcon}
              >
                <PaperplaneIcon
                  aria-hidden="true"
                  className={styles.icon}
                />
                <span>{emailLinkText}</span>
              </a>
            )}

            {/* Contact form button logic would go here if needed, omitted for mock */}
          </div>
        </div>
      </div>
    </div>
  );
};
