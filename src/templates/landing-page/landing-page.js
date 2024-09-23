import React from 'react';
import { graphql } from 'gatsby';
import get from 'lodash/get';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';

import { Seo } from '../../components/shared';
import { Layout, Hero, Countdown, CardGrid } from '../../components';


class LandingPageTemplate extends React.Component {
  render() {
    const landingPage = get(this.props, 'data.contentfulLandingPage');
    const type = landingPage.pageType;
    const seo = landingPage.seo;
    const plainTextContent = landingPage.content?.raw
                             && documentToPlainTextString(JSON.parse(landingPage.content.raw));

    let landingListElem;
    // TODO: Upgrade card grid to take tag sorting
    if (type === 'Events') {
      landingListElem = <CardGrid
                          items={get(this.props, 'data.allContentfulEvent.nodes')}
                          type="events"
                          padding="var(--size-gutter)"
                          acceptTags={landingPage.allowedTagIDs}
                          blockTags={landingPage.blockedTagIDs}
                        />;
    } else if (type === 'Blog Posts') {
      landingListElem = <CardGrid
                          items={get(this.props, 'data.allContentfulBlogPost.nodes')}
                          type="blog"
                          padding="var(--size-gutter)"
                          layout="large"
                        />;
    }

    return (
      <Layout location={this.props.location}>
        <Seo
          title={seo?.title || landingPage.title}
          description={seo?.description || plainTextContent}
          imageUrl={seo?.img?.url}
          keywords={seo?.keywords}
          robots={seo?.allowRobots}
          noRobotsTagIDs={seo?.noRobotsTagIDs}
          entryTags={landingPage.metadata?.tags}
        />
        <Hero
          title={landingPage.title}
          content={landingPage.content}
          variant="headline"
        />
        {landingPage.openTime ? (
          <Countdown
            preAccessMessage={landingPage.preAccessMessage}
            targetDate={landingPage.openTime}
            openElement={landingListElem}
          />
        ) : (
          landingListElem
        )}
      </Layout>
    );
  }
}

export default LandingPageTemplate;

/*
FOR EVENTS:
        bannerImg {
          img {
            gatsbyImage(
              layout: FULL_WIDTH
              placeholder: DOMINANT_COLOR
              width: 480
              height: 270
            )
          }
          alt
        }
*/

export const pageQuery = graphql`
  query LandingPageQuery($slug: String!) {
    contentfulLandingPage(slug: { eq: $slug }) {
      title
      content {
        raw
      }
      openTime
      preAccessMessage {
        raw
      }
      allowedTagIDs
      blockedTagIDs
      pageType
      metadata {
        tags {
          contentful_id
        }
      }
      seo {
        allowRobots
        description
        keywords
        title
        img {
          url
        }
        noRobotsTagIDs
      }
    }
    allContentfulEvent(
      filter: {listed: { eq: true }}
      sort: {eventHosts: {name: DESC}}
    ) {
      nodes {
        id
        metadata {
          tags {
            contentful_id
          }
        }
        title
        duration
        detailTags
        status
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
          status
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
    allContentfulBlogPost(
      sort: { publishDate: DESC }
    ) {
      nodes {
        title
        slug
        publishDate(formatString: "MMMM Do, YYYY")
        bannerImg {
          img {
            gatsbyImage(
              layout: FULL_WIDTH
              placeholder: DOMINANT_COLOR
              width: 480
              height: 270
            )
          }
          alt
        }
        intro {
          raw
        }
      }
    }
  }
`;
