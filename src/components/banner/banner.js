import React from 'react';

import BannerHeader from './banner--header';
import BannerHomepage from './banner--homepage';
import BannerHomepageInline from './banner--homepage-inline';
import BannerCTA from './banner--cta';
import BannerColumns from './banner--columns';

// TODO: Could really use prop spreading here
const Banner = ({
  type,
  title,
  content,
  image,
  classes,
  bgColor,
  usesRichtext = true
}) => {
  switch (type) {
    case 'homepage':
      return <BannerHomepage title={title} content={content} image={image} classes={classes} />;
    case 'homepage-inline':
      return <BannerHomepageInline title={title} content={content} image={image} classes={classes} />;
    case 'cta':
      return <BannerCTA title={title} content={content} classes={classes} bgColor={bgColor} usesRichtext={usesRichtext} />;
    case 'columns':
      return <BannerColumns title={title} content={content} classes={classes} usesRichtext={usesRichtext} />;
    default:
      return <BannerHeader title={title} content={content} image={image} classes={classes} usesRichtext={usesRichtext} />;
  }
};

export default Banner;
