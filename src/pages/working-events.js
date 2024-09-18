import React from 'react';
import { graphql } from 'gatsby';
import get from 'lodash/get';

import { Seo } from '../components/shared';
import { Layout, Hero, CardGrid } from '../components';

class EventsLanding extends React.Component {
  render() {
    // const events = get(this, 'props.data.allContentfulEvent.nodes');

    // return (
    //   <Layout location={this.props.location}>
    //     <Seo title="Working Events" robots={false} />
    //     <Hero title="Working Events" variant="headline" />
    //     <CardGrid items={events} type="event" padding="var(--size-gutter)" />
    //   </Layout>
    // );
    return (<></>)
  }
}

export default EventsLanding;

export const pageQuery = graphql`
  query EventsLandingQuery {
    allContentfulEvent(
      filter: {listed: { eq: true }}
      sort: {eventHosts: {name: DESC}}
    ) {
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
          }
          alt
        }
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
  }
`;
