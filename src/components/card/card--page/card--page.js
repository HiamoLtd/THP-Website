import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';

// Shared card styles
import * as styles from '../card.module.css';
// Styles specific to this card type
import * as typeStyles from './card--page.module.css';

const CardPage = ({ slugPrefix, page, classes }) => {
  if (!page) return;

  const wrapperClasses = classes ? `${classes} ${typeStyles.card}`
                                 : typeStyles.card;
                                 
  // let plainTextIntro = documentToPlainTextString(
  //   JSON.parse(page.intro?.raw)
  // );
  // const maxIntroLength = 75;
  // if (plainTextIntro.length > maxIntroLength) {
  //   plainTextIntro = plainTextIntro.slice(0, maxIntroLength - 1) + '...';
  // }

  console.log(page)

  return (
    <div id={page.id} className={wrapperClasses}>
      {/* <Link to={`/${slugPrefix}/${page.slug}`} className={`${styles.body} ${styles.cardLink}`}> */}
      <Link to={`/${page.slug || ''}`} className={`${styles.body} ${styles.cardLink}`}>
        {page.bannerImg?.img ? (
          <GatsbyImage
            alt={page.bannerImg.alt}
            image={page.bannerImg.img?.gatsbyImage}
            className={styles.image}
          />
        ) : (
          // TODO: Remove
          <img src={`/images/${page.imgName}`} alt="" className={styles.image} />
        )}
        <div className={`${styles.content} ${typeStyles.content}`}>
          {/* <h3 className={styles.title}>{page.shortTitle ? page.shortTitle : page.title}</h3> */}
          <h3 className={styles.title}>{page.title || "[Service Name]"}</h3>
          {/* {page.intro?.raw && (
            <em>{plainTextIntro}</em>
          )} */}
          <em>{page.intro || "[A short description for this service.]"}</em>
          <strong>Learn more →</strong>
        </div>
      </Link>
    </div>
  );
};

export default CardPage;
