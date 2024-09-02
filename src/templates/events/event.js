import React from 'react';
import { graphql } from 'gatsby';
import get from 'lodash/get';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { eventStatus } from '../../utilities/event-utils.js';

import { Seo } from '../../components/shared';
import { Layout, Hero, Tags, CardGrid } from '../../components';
import * as styles from './event.module.css';


// TODO: Load in child events
// TODO: Link parent events
// TODO: test, can we have images in the body?
// TODO: If event is fully booked, do not show it's booking info. Same for cancelled.

// TODO: Event locations are complicated, but I think we should just simplify them.
class EventTemplate extends React.Component {
  render() {
    const event = get(this.props, 'data.contentfulEvent');
    const seo = event.seo;

    // NOTE: Currently, Events do not load assets in their content.
    //       Keeping this here in case they do in future.
    const options = {
      renderNode: {
        [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const { gatsbyImageData, description } = node.data.target
        return (
           <GatsbyImage
              image={getImage(gatsbyImageData)}
              alt={description}
           />
         )
        },
      },
    };

    const defaultMetaDescription = documentToPlainTextString(
      JSON.parse(event.intro?.raw|| event.description?.raw)
    );

    // If no H&S data is given, display a default message
    let healthInformation = event.healthAndSafety?.raw
                            ? renderRichText(event.healthAndSafety, options)
                            : <p>Please contact the event host for health &amp; safety information.</p>;
    let defaultTypeInfo = null;
    // For all walking tour type events with "addTypeMessages", add an extra default message
    if (event.types?.includes('Walking Tour') && event.addTypeMessages === true) {
      defaultTypeInfo = <p>Please wear good shoes and dress for the weather. The tour may be cancelled in bad weather.</p>;
    }

    // Get the full tag list
    let tagList = event.types || [];
    if (event.detailTags) tagList = tagList.concat(event.detailTags);

    return (
      <Layout location={this.props.location}>
        <Seo
          title={seo?.title || event.title}
          description={seo?.description || defaultMetaDescription}
          imageUrl={seo?.img?.url || event.bannerImg?.img?.url}
          keywords={seo?.keywords}
          robots={seo?.allowRobots}
          noRobotsTagIDs={seo?.noRobotsTagIDs}
          entryTags={event.metadata?.tags}
        />
        <Hero
          altImage={event.bannerImg}
          title={event.title}
          variant="banner"
          status={eventStatus(event)}
        />
        <div className={styles.container}>
          <div className={styles.article}>
            <div className={styles.body}>
              {/* Image attribution */}
              {event.bannerImg?.note?.note && (
                <p className={styles.attribution}>
                  {event.bannerImg.note.note}
                </p>
              )}

              {/* Body content text */}
              {event.intro?.raw &&
                <div className={styles.intro}>
                  {renderRichText(event.intro, options)}
                </div>
              }
              {event.description?.raw && renderRichText(event.description, options)}
              
              <div className={styles.healthAndSafety}>
                <h3>Health &amp; Safety</h3>
                {healthInformation}
                {defaultTypeInfo && defaultTypeInfo}
              </div>
            </div>
            
            {/* Extra details as content */}
            <div className={styles.details}>
              {/* By default, show detailed location. If missing, use short location. */}
              <p>
                <div className="location-wrapper">
                  <strong>Location </strong>
                  <span className="icon--location" />
                </div>
                {event.detailedLocation?.detailedLocation || event.location}
              </p>

              {event.regions && (<p><strong>Regions </strong><Tags tags={event.regions} /></p>)}
              {tagList && (
                <p>
                  <strong>Tags </strong>
                  <Tags tags={tagList} />
                </p>
              )}
            </div>
          </div>

          {/* TODO: New card grid with wrapping control */}
          {event.times?.length > 0 && (
            <div id="times" className={styles.wrappedGrid}>
              <h2 className={styles.sectionHeader}>Event times</h2>
              <CardGrid
                items={event.times}
                type="time"
                bgColor="transparent"
                layout="Compact"
                padding="0"
                overflow="visible"
              />
            </div>
          )}
          {/* TODO: Better linking of events. Show the parent event, maybe show siblings? */}
          {event.childEvents?.length > 0 && (
            <div id="related-events" className={styles.wrappedGrid}>
              <h2 className={styles.sectionHeader}>Related events</h2>
              <CardGrid
                items={event.childEvents}
                type="event"
                bgColor="transparent"
                layout="Medium"
                padding="0"
                overflow="visible"
              />
            </div>
          )}
        </div>
        {/* TODO: Make this separate, maybe, possibly? For now make it separate, full or half width, in it's own wrapper. Later may be sidebar */}
        <div className={`${styles.container} ${styles.containerBlock}`} id="hosts">
          <CardGrid
            items={event.eventHosts}
            type="host"
            bgColor="var(--secondary)"
            padding="0 var(--size-gutter) var(--size-gutter)"
            layout="Wide"
          />
        </div>
        {/* TODO: Eventually, other events. Make its own section and list random other upcoming events */}
      </Layout>
    );
  }
}

export default EventTemplate;

export const pageQuery = graphql`
  query EventBySlug($slug: String!) {
    contentfulEvent(slug: { eq: $slug }) {
      id
      slug
      title
      shortTitle
      bannerImg {
        img {
          gatsbyImage(
            layout: FULL_WIDTH
            placeholder: DOMINANT_COLOR
            width: 1920
            height: 1080
          )
          url
        }
        alt
        note {
          note
        }
      }
      intro {
        raw
      }
      description {
        raw
      }
      healthAndSafety {
        raw
      }
      times {
        bookingRequired
        bookingInfo {
          raw
        }
        title
        cost
        costOption
        note
        endDate
        fullFestivalDuration
        startDate
        id
        status
      }
      location
      detailedLocation {
        detailedLocation
      }
      duration
      detailTags
      addTypeMessages
      regions
      types
      status
      eventHosts {
        id
        name
        description {
          description
        }
        email
        phone
        website
        facebookUrl
        instagramUrl
        linkedInUrl
        twitterUrl
        tikTokUrl
      }
      childEvents {
        bannerImg {
          alt
          img {
            gatsbyImage(layout: FULL_WIDTH, placeholder: DOMINANT_COLOR, width: 480, height: 270)
          }
        }
        title
        shortTitle
        detailTags
        duration
        id
        intro {
          raw
        }
        location
        slug
        status
        times {
          bookingRequired
          cost
          costOption
          endDate
          fullFestivalDuration
          id
          note
          startDate
          status
        }
        types
      }
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
  }
`;
