import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';

import * as styles from './sponsor.module.css';


const Sponsor = ({ name, image, website }) => {
  if (!image) return;

  return (
    <a href={website} title={`Visit the ${name} website`} className={styles.container}>
      <GatsbyImage
        alt={`Logo of ${name}`}
        image={image.gatsbyImage}
        className={styles.image}
        objectFit="CONTAIN"
      />
    </a>
  );
};

export default Sponsor;
