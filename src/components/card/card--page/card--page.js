import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';

// Shared card styles
import * as styles from '../card.module.css';
// Styles specific to this card type
import * as typeStyles from './card--page.module.css';

const CardPage = ({ page, slugPrefix, classes }) => {
  if (!page) return;

  const wrapperClasses = classes ? `${classes} ${typeStyles.card}`
                                 : typeStyles.card;

  let plainTextIntro = page.cardIntro || documentToPlainTextString(JSON.parse(page.intro?.raw));
  const maxIntroLength = 75;
  if (plainTextIntro.length > maxIntroLength) {
    plainTextIntro = plainTextIntro.slice(0, maxIntroLength - 1) + '...';
  }

  return (
    <div id={page.id} className={wrapperClasses}>
      <Link to={`/${slugPrefix}/${page.slug}`} className={`${styles.body} ${styles.cardLink}`}>
        {page.bannerImg?.img && (
          <GatsbyImage
            alt={page.bannerImg.alt}
            image={page.bannerImg.img?.gatsbyImage}
            className={styles.image}
          />
        )}
        <div className={`${styles.content} ${typeStyles.content}`}>
          <h3 className={styles.title}>{page.title}</h3>
          {plainTextIntro?.length > 0 && (
            <em>{plainTextIntro}</em>
          )}
          <strong>Learn more →</strong>
        </div>
      </Link>
    </div>
  );
};

export default CardPage;
