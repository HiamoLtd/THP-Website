import React, { useState } from 'react';
import { Link } from 'gatsby';

import { SocialLinks } from '../../';
import * as styles from './navigation.module.css';

const NavHamburger = ({ navOpen, toggleOpen }) => (
  <div
    className={`${styles.hamburgerWrapper}`}
    type="button"
    id="nav-toggle"
    role="button"
    data-toggle="collapse"
    aria-controls="Navbar toggle"
    aria-expanded={navOpen}
    aria-label="Toggle navigation"
    onClick={() => toggleOpen()}
  >
    <div className={`${styles.hamburger} ${!!navOpen && styles.open}`}>
      <span />
      <span />
      <span />
      <span />
    </div>
  </div>
);

const NavItem = ({ path, name }) => (
  <li className={styles.navigationItem}>
    <Link to={path} activeClassName="active">
      {name}
    </Link>
  </li>
);

const Navigation = () => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(open ? false : true);
  }

  let navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about/' },
    { name: 'Services', path: '/blog/' },
  ];

  // TODO: Actually load nav items from admin
  // TODO: Admin side of nav items

  const navItemElems = navItems.map(item => 
    <NavItem path={item.path} name={item.name} />
  );
  
  const socialLinksElem = (
    <li className={styles.navigationSocialLinks}>
      <SocialLinks iconWidth="30px" iconHeight="30px" />
    </li>
  );

  return (
    <nav role="navigation" className={styles.container} aria-label="Main">
      {/* Navbar logo */}
      <div className={styles.containerShadow}>
        <div className={styles.logoBg} />
      </div>
      <Link to="/" className={styles.logoLink}>
        <span className={styles.logo} />
      </Link>
      {/* Navbar content to the right of the logo. */}
      <div className={styles.navControlsWrapper}>
        {/* Collapse controls */}
        <NavHamburger navOpen={open} toggleOpen={toggleOpen} />
        {/* Navbar links (Non mobile) */}
        <ul className={styles.navigation}>
          {navItemElems}
        {socialLinksElem}
        </ul>
      </div>
      {/* For mobile only, list all the navigation pages beneath the main bar instead via toggle. */}
      <ul className={`${styles.navigation} ${styles.navigationMobile} ${open && styles.navExpanded}`}>
        {navItemElems}
        {socialLinksElem}
      </ul>
    </nav>
  );
}

export default Navigation;
