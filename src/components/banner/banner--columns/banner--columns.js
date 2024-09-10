import React from 'react';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { BLOCKS } from '@contentful/rich-text-types';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import * as styles from './banner--columns.module.css';
import { Container } from '../../shared';

const BannerContent = ({usesRichtext, content}) => {
  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { gatsbyImageData, description } = node.data.target
      return (
         <GatsbyImage
            image={getImage(gatsbyImageData)}
            alt={description}
         />
       )
      },
    },
  };
  
  return (
    <>
      {/* CTA content is usually richtext */}
      {usesRichtext ? (
        <div className={styles.content}>
          {renderRichText(content, options)}
        </div>
      ) : (
        <p className={styles.content}>{content}</p>
      )}
    </>
  );
};

// THP: A variant of the CTA banner split between columns.
const BannerColumns = ({
  title,
  content,
  classes,
  usesRichtext = true
}) => {
  // TODO: Load image in for the right

  return (
    <div className={`${styles.container} ${classes || ''}`}>
      <Container bgColor="transparent" classes={`${styles.contentWrapper} ${styles.row}`}>
        <div className={`${styles.column} ${styles.columnPadded}`}>
          {title && (
            <>
              <h2 className={styles.title}>{title}</h2>
              {content && <hr />}
            </>
          )}
          <BannerContent usesRichtext={usesRichtext} content={content} />
        </div>
        <div className={`${styles.column} ${styles.columnImage}`}>
          <img src="/images/who_we_are.jpg" alt="" />
        </div>
      </Container>
    </div>
  );
}

export default BannerColumns;
