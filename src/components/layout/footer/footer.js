import React from 'react';
import { Link } from 'gatsby';

import Container from '../../shared/container';
import { SocialLinks } from '../../';
import * as styles from './footer.module.css';

function getYear() {
  return new Date().getFullYear();
}

const Footer = () => (
  <Container as="footer">
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={`${styles.column} ${styles.textColumn}`}>
          {/* <p>
            This site is still being built. You may notice changes coming through over the next few weeks.
          </p> */}
          <Link to="/events" className={styles.basicLink}>
            Events
          </Link>
          <Link to="/form/donate/" className={styles.basicLink}>
            Donate or Sponsor
          </Link>
          <Link to="/blog" className={styles.basicLink}>
            Blog
          </Link>
          {/* <Link to="/clustering" className={styles.basicLink}>
            Event Clustering
          </Link> */}
          <Link to="/about" className={styles.basicLink}>
            About
          </Link>
          <a className={styles.contact} href="mailto:info@wellingtonheritageweek.co.nz" title="Email us">
            info@wellingtonheritageweek.co.nz
          </a>
          <span className={styles.legal}>
            © The Heritage Practice Ltd.
            {' '}
            {getYear()}
          </span>
        </div>
        <div className={styles.column}>
          <Link to="/" className={styles.logoLink}>
            <span className={styles.logo} />
          </Link>
        </div>
        <div className={`${styles.column} ${styles.socialWrapper}`}>
          <SocialLinks />
        </div>
      </div>
      <span className={styles.attribution}>Built by <a href="https://hiamo.nz/">Hiamo Ltd.</a></span>
    </div>
  </Container>
);

export default Footer;
