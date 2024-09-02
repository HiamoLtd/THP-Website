import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';

// Shared card styles
import * as styles from '../card.module.css';
// Styles specific to this card type
import * as typeStyles from './card--blog.module.css';

const CardBlog = ({ post, classes }) => {
  if (!post) return;

  const wrapperClasses = classes ? `${classes} ${typeStyles.card}`
                                 : typeStyles.card;
                                 
  let plainTextIntro = documentToPlainTextString(
    JSON.parse(post.intro?.raw)
  );
  const maxIntroLength = 75;
  if (plainTextIntro.length > maxIntroLength) {
    plainTextIntro = plainTextIntro.slice(0, maxIntroLength - 1) + '...';
  }

  return (
    <div id={post.id} className={wrapperClasses}>
      <Link to={`/blog/${post.slug}`} className={`${styles.body} ${styles.cardLink}`}>
        {post.bannerImg?.img && (
          <GatsbyImage
            alt={post.bannerImg.alt}
            image={post.bannerImg.img?.gatsbyImage}
            className={styles.image}
          />
        )}
        <div className={`${styles.content} ${typeStyles.content}`}>
          <h3 className={styles.title}>{post.shortTitle ? post.shortTitle : post.title}</h3>
          {post.intro?.raw && (
            <em>{plainTextIntro}</em>
          )}
          <strong>Read more →</strong>
        </div>
      </Link>
    </div>
  );
};

export default CardBlog;
