import React from 'react';

import BannerHeader from './banner--header';
import BannerHomepage from './banner--homepage';
import BannerCTA from './banner--cta';

// TODO: Could really use prop spreading here
const Banner = ({
  type,
  title,
  content,
  image,
  classes,
  usesRichtext = true
}) => {
  switch (type) {
    case 'homepage':
      return <BannerHomepage title={title} content={content} image={image} classes={classes} />;
    case 'cta':
      return <BannerCTA title={title} content={content} classes={classes} usesRichtext={usesRichtext} />;
    default:
      return <BannerHeader title={title} content={content} image={image} classes={classes} usesRichtext={usesRichtext} />;
  }
};

export default Banner;
