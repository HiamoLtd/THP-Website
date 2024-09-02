import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import {
  eventStatus,
  timeString,
  getBookingsRequirement,
  getCostOption
} from '../../../utilities/event-utils.js';

import Tags from '../../tags';
// Shared card styles
import * as styles from '../card.module.css';
// Styles specific to this card type
import * as typeStyles from './card--event.module.css';


const getStatusClass = (status) => {
  // TODO: do we want to use diff teal colours for diff default status?
  switch (status.toLowerCase()) {
    case 'fully booked':
      return styles.detailPillBooked
    case 'cancelled':
      return styles.detailPillCancelled;
    case 'rescheduled':
      return styles.detailPillRescheduled;
    default:
      return '';
  }
}

const CardEvent = ({ event, classes }) => {
  if (!event) return;

  const wrapperClasses = classes ? `${classes} ${typeStyles.card}`
                                 : typeStyles.card;

  const overallStatus = eventStatus(event);
  let statusLevelClass = overallStatus && getStatusClass(overallStatus);

  // Limit event times to a set number on the cards
  const maxTimes = 2;
  const eventTimes = event.times ? [] : null;
  event.times?.slice(0, maxTimes).forEach((time) => {
    const timeStr = timeString(time);
    timeStr?.length > 0 && eventTimes.push(timeStr);
  });

  const eventRequiresBooking = getBookingsRequirement(event);
  const eventCostOption = getCostOption(event);

  // TODO: Smaller font eventually
  // TODO: Time tag module, may want tag module built in general soon. Use the default for now
  // TODO: Util method to return full array of all times and sub times

  return (
    <div id={event.id} className={wrapperClasses}>
      <Link to={`/event/${event.slug}`} className={`${styles.body} ${styles.cardLink}`}>
        {/* TODO: shared element between this and """heros""" which allow for tags in the top? */}
        {/* TODO: Summon a smaller banner image, either here or in the landing pages */}
        {event.bannerImg?.img && (
          <>
            <GatsbyImage
              alt={event.bannerImg.alt}
              image={event.bannerImg.img?.gatsbyImage}
              className={styles.image}
            />
            {/* TODO: Semi reused styles, should have global option. Really thing SCSS would be wise. */}
            {/* TODO: Also want to adjust this for blogs or anything without an image */}
            {/* TODO: Colour should be based on content. Think this should be a module tbh */}
            {overallStatus && (<span className={`${styles.detailPill} ${statusLevelClass}`}>{overallStatus}</span>)}
          </>
        )}

        <div className={`${styles.content} ${typeStyles.content}`}>
          <h3 className={styles.title}>{event.shortTitle ? event.shortTitle : event.title}</h3>

          {eventTimes && (
            <div className={typeStyles.timesGrid}>
              {eventTimes.map((time) => 
                <span className={typeStyles.timePill}>
                  {time}
                </span>
              )}
              {event.times.length > maxTimes &&
                <span className={styles.timesOverflow}>
                  + {event.times.length - maxTimes} more
                </span>
              }
            </div>
          )}

          {event.location && (
            <div className={`location-wrapper ${typeStyles.location}`}>
              <span class="icon--location" />
              <span>{event.location}</span>
            </div>
          )}

          {event.childEvents?.length > 0 && (
            <strong>View {event.childEvents.length} event{event.childEvents.length > 1 && 's'} inside {'→'}</strong>
          )}

          <Tags tags={event.detailTags} />
        </div>

        {(eventCostOption || eventRequiresBooking) && (
          <div className={typeStyles.costWrapper}>
            {eventCostOption && (
              <span className={typeStyles.cost}>
                {eventCostOption}
                {eventRequiresBooking && <>
                  &nbsp;- <strong className={typeStyles.bookingReq}>Booking required</strong>
                </>}
              </span>
            )}

            {eventRequiresBooking && (
              <span className={typeStyles.bookingLink}>Book</span>
            )}
          </div>
        )}
      </Link>
    </div>
  );
};

export default CardEvent;
