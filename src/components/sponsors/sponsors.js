import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import * as styles from './sponsors.module.css';

import Sponsor from './sponsor';


const Sponsors = () => {
  const data = useStaticQuery(graphql`
    query SponsorsQuery {
      allContentfulSiteSettings(filter: {activeSettings: {eq: "Site-Wide Settings"}}) {
        nodes {
          sponsors {
            name
            website
            image {
              gatsbyImage(
                layout: FULL_WIDTH
                placeholder: DOMINANT_COLOR
                height: 120
                quality: 100
              )
            }
          }
        }
      }
    }
  `);

  const sponsor_list = data?.allContentfulSiteSettings?.nodes[0]?.sponsors;
  if (sponsor_list?.size <= 0) return;

  return (
    <div className={styles.container} id="sponsors">
      <h3 className={styles.title}>Our Sponsors</h3>
      <hr className={styles.divider} />

      <div className={styles.sponsorsWrapper}>
        {sponsor_list?.map((sponsor) => (
          <Sponsor name={sponsor.name} website={sponsor.website} image={sponsor.image} />
        ))}
      </div>
    </div>
  );
};

export default Sponsors;
