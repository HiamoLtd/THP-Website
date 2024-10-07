import React from 'react';

import * as styles from './banner--homepage-inline.module.css';
import { Container } from '../../shared';

// THP: A variant of the homepage banner with the content and title
//      inside the image element, rather than beneath.
const BannerHomepageInline = ({
  title,
  content,
  image
}) => (
  <div className={styles.container}>
    {/* Full width banner image */}
    <div className={styles.imageWrapper}>
      <div
        className={styles.image}
        // style={{backgroundImage: `url(${image?.url})`}}
        style={{backgroundImage: `url(/images/THP_Wallpaper_Butterfly.jpg`}}
      >
        <Container bgColor="transparent" classes={styles.contentOuterWrapper} padding="0 var(--size-gutter)">
          <Container bgColor="var(--secondary)" classes={styles.contentInnerWrapper}>
            <h1 className={styles.title}>{title}</h1>
            {content && (
              <>
                <hr />
                {/* Homepage content is never richtext */}
                {content && <p className={styles.content}>{content}</p>}
              </>
            )}
          </Container>
        </Container>
      </div>
    </div>
  </div>
);

export default BannerHomepageInline;
