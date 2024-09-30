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
  status,
  hardcodedImageUrl
}) => {
  {/* TODO: Remove hardcoded image */}
  switch (type) {
    case 'flex':
      return <HeroFlex hardcodedImageUrl={hardcodedImageUrl} title={title} content={content} image={image} altImage={altImage} usesRichtext={usesRichtext} status={status} />;
    case 'full-page':
      return <HeroFullPage hardcodedImageUrl={hardcodedImageUrl} title={title} content={content} image={image} altImage={altImage} usesRichtext={usesRichtext} status={status} />;
    default:
      return <HeroFullPage hardcodedImageUrl={hardcodedImageUrl} title={title} content={content} image={image} altImage={altImage} usesRichtext={usesRichtext} status={status} />;
  }
};

export default Hero;
