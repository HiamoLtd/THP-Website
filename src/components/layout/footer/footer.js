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
          <Link to="/" className={styles.basicLink}>
            Home
          </Link>
          <Link to="/about" className={styles.basicLink}>
            About Us
          </Link>
          <Link to="/services/" className={styles.basicLink}>
            Services
          </Link>
          {/* <a className={styles.contact} href="mailto:info@wellingtonheritageweek.co.nz" title="Email us">
            info@wellingtonheritageweek.co.nz
          </a> */}
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
          <span className={`${styles.legal} ${styles.attribution}`}>Built by <a href="https://hiamo.nz/">Hiamo Ltd.</a></span>
        </div>
      </div>
    </div>
  </Container>
);

export default Footer;
