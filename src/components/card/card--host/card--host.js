import React from 'react';

import { SocialLinks } from '../../';
// Shared card styles
import * as styles from '../card.module.css';
// Styles specific to this card type
import * as typeStyles from './card--host.module.css';

const SocialSection = ({ host }) => {
  const socialLinks = [
    { url: host.facebookUrl, title: `Visit the ${host.name} Facebook page` },
    { url: host.instagramUrl, title: `Visit the ${host.name} Instagram page` },
    { url: host.twitterUrl, title: `Visit the ${host.name} X page` },
    { url: host.linkedInUrl, title: `Visit the ${host.name} LinkedIn page` },
    { url: host.tikTokUrl, title: `Visit the ${host.name} TikTok page` }
  ];

  return (
    <SocialLinks linkTuples={socialLinks} iconWidth="30px" />
  );
}

const CardHost = ({ host, classes }) => {
  if (!host) return;

  const wrapperClasses = classes ? `${classes} ${typeStyles.card}`
                                 : typeStyles.card;

  return (
    <div id={host.id} className={wrapperClasses}>
      <div className={`${styles.body} ${typeStyles.body}`}>
        <div className={`${styles.content} ${typeStyles.content}`}>
          {/* Basic host info */}
          <h3 className={styles.title}>
            {host.name}
          </h3>
          {host.description?.description && (
            <p>{host.description.description}</p>
          )}
          {/* Contact details */}
          {host.email && (
            <p><strong>Email:</strong> <a href={`mailto:${host.email}`} title={`Email ${host.name}`}>{host.email}</a></p>
          )}
          {host.phone && (
            <p><strong>Phone:</strong> <a href={`ph:${host.phone}`} title={`Call ${host.name}`}>{host.phone}</a></p>
          )}
          {/* Websites link */}
          {host.website && (
            <p><strong>Website:</strong> <a href={host.website} title={`Visit the website for ${host.name}`}>{host.website}</a></p>
          )}
          {/* Social media links as icons */}
          <SocialSection host={host} />
        </div>
      </div>
    </div>
  );
};

export default CardHost;
