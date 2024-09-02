import React from 'react';

import * as styles from './banner--homepage.module.css';
import { Container } from '../../shared';

const BannerHomepage = ({
  title,
  content,
  image
}) => (
  <div className={styles.container}>
    {/* Full width banner image */}
    <div className={styles.imageWrapper}>
      <div
        className={styles.image}
        style={{backgroundImage: `url(${image?.url})`}}
      />
    </div>
    {/* Content banner below images */}
    <Container bgColor="var(--secondary)" classes={styles.contentWrapper}>
      <h1 className={styles.title}>{title}</h1>
      {content && (
        <>
          <hr />
          {/* Homepage content is never richtext */}
          <p className={styles.content}>{content}</p>
        </>
      )}
    </Container>
  </div>
);

export default BannerHomepage;
