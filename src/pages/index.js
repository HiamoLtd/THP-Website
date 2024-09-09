import React from 'react';
import { graphql } from 'gatsby';
import get from 'lodash/get';

import { Seo } from '../components/shared';
import { Layout, Banner } from '../components';

class RootIndex extends React.Component {
  render() {
    const homepage = get(this, 'props.data.contentfulHomepage');
    const seo = homepage.seo;

    return (
      <Layout location={this.props.location}>
        <Seo
          title={seo?.title || homepage.title}
          description={seo?.description || "The Heritage Practice is here to help you."}
          imageUrl={seo?.img?.url || homepage.bannerImg?.img?.url}
          keywords={seo?.keywords}
          robots={seo?.allowRobots}
        />
        {/* Image banner with text */}
        <Banner
          type="homepage-inline"
          title={"The Heritage Practice"}
          content={homepage.bannerContent?.bannerContent}
          image={homepage.bannerImage}
        />
        {/* THP - Purpose Statement Section */}
        {homepage.ctaContent && (
          <Banner
            type="cta"
            title="The Heritage Practice"
            content={homepage.ctaContent}
            usesRichtext={true}
          />
        )}
        {/* THP - Who We Are Section */}
          {/* TODO: Brief into text, photo, link to about page */}
        {homepage.ctaContent && (
          <Banner
            type="cta"
            title="Who We Are"
            content={homepage.ctaContent}
            usesRichtext={true}
          />
        )}
        
        {/* THP - More About Us Section */}
        {/* TODO: Same section type as above, but with different content somehow */}
        {homepage.ctaContent && (
          <Banner
            type="cta"
            title="More About Us"
            content={homepage.ctaContent}
            usesRichtext={true}
          />
        )}
        
        {/* THP - Services We Provide Section */}
        {/* TODO: Three sections, title, description, link for each one? Or just link to services page? */}
        {homepage.ctaContent && (
          <Banner
            type="cta"
            title="What We Do"
            content={homepage.ctaContent}
            usesRichtext={true}
          />
        )}

        {/* THP - Contact Section */}
        {homepage.contactContent && (
          <Banner
            type="cta"
            title="CONTACT US"
            content={homepage.contactContent}
            // classes={styles.contactBanner}
            usesRichtext={true}
          />
        )}

        {/* Newsletter signup */}
        {/* <NewsletterSignup /> */}
        {/* Contact Call To Action banner */}
        {/* {homepage.contactContent && (
          <Banner
            type="cta"
            title="Contact Us"
            content={homepage.contactContent}
            usesRichtext={true}
          />
        )} */}
        {/* Sponsors */}
        {/* <Sponsors /> */}

        {/* TODO: */}
      </Layout>
    )
  }
};

export default RootIndex;

export const pageQuery = graphql`
  query HomeQuery {
    contentfulHomepage {
      title
      bannerContent {
        bannerContent
      }
      bannerImage {
        url
      }
      ctaContent {
        raw
      }
      contactContent {
        raw
      }
      seo {
        allowRobots
        description
        keywords
        title
        img {
          url
        }
      }
    }
    allContentfulEvent(filter: { listed: { eq: true } }, sort: {updatedAt: DESC}) {
      nodes {
        id
        title
        bannerImg {
          img {
            gatsbyImage(
              layout: FULL_WIDTH
              placeholder: DOMINANT_COLOR
              width: 480
              height: 270
            )
            url
          }
          alt
        }
        duration
        detailTags
        location
        regions
        shortTitle
        slug
        types
        times {
          bookingRequired
          bookingInfo {
            raw
          }
          cost
          costOption
          endDate
          fullFestivalDuration
          startDate
        }
        childEvents {
          duration
          times {
            bookingRequired
            costOption
            endDate
            fullFestivalDuration
            status
            startDate
          }
        }
        intro {
          raw
        }
      }
    }
  }
`
