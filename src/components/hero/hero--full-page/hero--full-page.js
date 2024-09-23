import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { renderRichText } from 'gatsby-source-contentful/rich-text';

import * as styles from './hero--full-page.module.css';

const getStatusClass = (status) => {
  // TODO: do we want to use diff teal colours for diff default status?
  switch (status.toLowerCase()) {
    case 'fully booked':
      return styles.detailPillBooked;
    case 'cancelled':
      return styles.detailPillCancelled;
    case 'rescheduled':
      return styles.detailPillRescheduled;
    default:
      return '';
  }
}

const HeroFullPage = ({
  image,
  altImage,
  title,
  content,
  usesRichtext = true,
  status
}) => {
  const statusLevelClass = status && getStatusClass(status);

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        {altImage
          ? <GatsbyImage className={styles.image} alt={altImage.alt} image={altImage.img?.gatsbyImage} />
          : image && <GatsbyImage className={styles.image} alt={title} image={image} />
        }
        <div className={styles.details}>
          {status && (<span className={`${styles.detailPill} ${statusLevelClass}`}>{status}</span>)}
          <h1 className={styles.title}>{title}</h1>
          {content && (
            <div className={styles.content}>{usesRichtext ? renderRichText(content) : content}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HeroFullPage;
