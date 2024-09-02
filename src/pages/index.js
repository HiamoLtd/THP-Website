import React from 'react';
import { graphql } from 'gatsby';
import get from 'lodash/get';

import { Seo } from '../components/shared';
import { Layout, NewsletterSignup, Sponsors, Banner } from '../components';

class RootIndex extends React.Component {
  render() {
    // const events = get(this, 'props.data.allContentfulEvent.nodes');
    const homepage = get(this, 'props.data.contentfulHomepage');
    const seo = homepage.seo;

    return (
      <Layout location={this.props.location}>
        <Seo
          title={seo?.title || homepage.title}
          description={seo?.description || "Experience Wellington's people, places, and stories."}
          imageUrl={seo?.img?.url || homepage.bannerImg?.img?.url}
          keywords={seo?.keywords}
          robots={seo?.allowRobots}
        />
        {/* Image banner with text */}
        <Banner
          type="homepage"
          title={homepage.title}
          content={homepage.bannerContent?.bannerContent}
          image={homepage.bannerImage}
        />
        {/* "Information" banner about the state of the festival */}
          {/* TODO: Hide if there are upcoming events? Not really needed if there are events to see */}
          {/* TODO: Part of banner module, just a submodule or something */}
          {/* TODO: Later, ditch this here, use a "Site Status" class instead so we don't need to update it all the time */}
        {homepage.ctaContent && (
          <Banner
            type="cta"
            content={homepage.ctaContent}
            usesRichtext={true}
          />
        )}
        {/* Upcoming events section */}
          {/* TODO: Need this to be rearranged by date which we can't do yet */}
        {/* Newsletter signup */}
        <NewsletterSignup />
        {/* Contact Call To Action banner */}
        {homepage.contactContent && (
          <Banner
            type="cta"
            title="CONTACT US"
            content={homepage.contactContent}
            // classes={styles.contactBanner}
            usesRichtext={true}
          />
        )}
        {/* Sponsors */}
        <Sponsors />

        {/* TODO: */}
        {/* Homepage needs:
          - Banner heading
          - Banner content
          - Banner image
          - CTA content - From site state? Try later
          - CTA image - From site state? Try later
          - Contact heading
          - Contact content
          - SEO
          - Newsletter

          From site settings comes:
          - Sponsors
        */}
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
