import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import * as styles from './sponsors.module.css';

import Container from '../shared/container';
import Sponsor from './sponsor';


const Sponsors = () => {
  const data = useStaticQuery(graphql`
    query SponsorsQuery {
      allContentfulSiteSettings(filter: {activeSettings: {eq: "Site-Wide Settings"}}) {
        nodes {
          sponsors {
            metadata {
              tags {
                contentful_id
              }
            }
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
  // Filter out all sponsors tagged as "example" or "preview"
  const blockTags = ['example', 'preview'];
  const display_list = sponsor_list.filter(sponsor => {
    const tags = sponsor?.metadata?.tags;
    if (
      blockTags?.length > 0 &&
      (tags && blockTags.some((blockTag) => tags.some((t) => t.contentful_id === blockTag)))
    ) {
      return false;
    } else {
      return true;
    }
  });
  if (display_list?.size <= 0) return;

  return (
    <Container>
      <div className={styles.container} id="sponsors">
        <h3 className={styles.title}>Our Sponsors</h3>
        <hr className={styles.divider} />

        <div className={styles.sponsorsWrapper}>
          {display_list?.map((sponsor) => (
            <Sponsor name={sponsor.name} website={sponsor.website} image={sponsor.image} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Sponsors;
