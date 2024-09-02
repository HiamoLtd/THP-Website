import React from 'react';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { BLOCKS } from '@contentful/rich-text-types';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import * as styles from './banner--cta.module.css';
import { Container } from '../../shared';

const BannerCTA = ({
  title,
  content,
  classes,
  usesRichtext = true
}) => {
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
    <div className={`${styles.container} ${classes || ''}`}>
      {/* Content banner */}
      <Container bgColor="transparent" classes={styles.contentWrapper}>
        {title && (
          <>
            <h2 className={styles.title}>{title}</h2>
            {content && <hr />}
          </>
        )}
        {content && (
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
        )}
      </Container>
    </div>
  );
}

export default BannerCTA;
