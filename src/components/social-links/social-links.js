import React from 'react';

import * as styles from './social-links.module.css';
import { Icon } from '../';

const getSocialIconName = (url) => {
  if (!url) return;

  url = url.toLowerCase();

  if (url.includes('instagram')) return 'instagram';
  else if (url.includes('linkedin')) return 'linkedin';
  else if (url.includes('twitter')) return 'twitter';
  else if (url.includes('x.co')) return 'twitter';
  else if (url.includes('tiktok')) return 'tiktok';

  return 'facebook';
}

const SocialLinkIcon = ({
  icon,
  url,
  title,
  width,
  height
}) => {
  if (!url) return;

  return (
    <a href={url} title={title} target="_blank">
      <Icon
        icon={icon || getSocialIconName(url)}
        width={width}
        height={height}
        fill="currentColor"
      />
    </a>
  );
}

const SocialLinks = ({ linkTuples, iconWidth = '40px', iconHeight = iconWidth }) => {
  if (!linkTuples) {
    // TODO: This is hardcoded, ideally should come from site but we are pressed for time.
    linkTuples = [
      { icon: "facebook", url: "https://www.facebook.com/WellingtonHeritageFestival" },
      { icon: "instagram", url: "https://www.instagram.com/wellingtonheritagefestival" },
      { icon: "linkedin", url: "https://www.linkedin.com/company/wellington-heritage-festival" },
      { icon: "tiktok", url: "https://www.tiktok.com/@wellingtonheritagefest" }
    ];
  }

  return (
    <div className={styles.container}>
      {linkTuples?.map((socialTuple) => (
        <SocialLinkIcon
          icon={socialTuple.icon}
          url={socialTuple.url}
          title={socialTuple.title}
          width={iconWidth}
          height={iconHeight}
        />
      ))}
    </div>
  );
};

export default SocialLinks;
