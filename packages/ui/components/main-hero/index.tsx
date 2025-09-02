import {Paragraph} from '@digdir/designsystemet-react';
import {SignIn} from '../sign-in/index.tsx';
import styles from './style.module.css'; // Assuming you have a CSS file for styles
import { trackEvent } from "@packages/analytics/posthog";

export function MainHero() {
  const handleSignInClick = () => {
    trackEvent('sign_in_button_clicked', {
      component: 'SignInButton',
    });
  };

  return (
    <section className={styles.mainHero}>
      <div className={styles.contentContainer}>
        <div className={styles.content}>
          <Paragraph className={styles.contentTitle}>
            Logg inn for oversikt over din dialog med det offentlige. Innboks,
            innstillinger, oversikt over brukere og historikk.
          </Paragraph>
          <span className={styles.buttonContainer}>
            <SignIn
              dataSize="lg"
              onClick={handleSignInClick}
            />
          </span>
        </div>
      </div>
      <div className={styles.image}>
        <img
          src="/main_hero.png"
          alt="Illustration of a person using a digital service"
          width="300"
          height="300"
        />
      </div>
    </section>
  );
}
