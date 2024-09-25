import React from 'react';

import HeroFlex from './hero--flex';
import HeroFullPage from './hero--full-page';


const Hero = ({
  image,
  altImage,
  title,
  content,
  usesRichtext = true,
  type,
  status
}) => {
  switch (type) {
    case 'flex':
      return <HeroFlex title={title} content={content} image={image} altImage={altImage} usesRichtext={usesRichtext} status={status} />;
    case 'full-page':
      return <HeroFullPage title={title} content={content} image={image} altImage={altImage} usesRichtext={usesRichtext} status={status} />;
    default:
      return <HeroFullPage title={title} content={content} image={image} altImage={altImage} usesRichtext={usesRichtext} status={status} />;
  }
};

export default Hero;
