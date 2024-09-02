import React from 'react';

import NewsletterForm from './newsletter-form';
import { Container } from '../shared';
import * as styles from './newsletter-signup.module.css';

const NewsletterSignup = () => {
  return (
    <Container>
      <div className={styles.newsletterSignup} id="newsletter-signup">
        <div className={styles.wrapper}>
          <div className={styles.newsletterLeft}>
            <h3 className={styles.newsletterHeader}>Sign up to our newsletter!</h3>
            <p className={styles.newsletterDescription}>
              Find out about heritage happenings in the region, get early access to Wellington Heritage Festival events, &amp; more.
            </p>
          </div>
          <div className={styles.newsletterRight}>
            <NewsletterForm />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default NewsletterSignup;
