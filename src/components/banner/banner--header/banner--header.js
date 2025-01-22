import React from 'react';

import * as styles from './banner--header.module.css';

const BannerHeader = ({
  title,
  images,
  classes,
  id
}) => {
  
  return (
    <div id={id}>
      HEADER BANNER: {title}
    </div>
  )
};

export default BannerHeader;
