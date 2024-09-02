import React from 'react';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { timeString } from '../../../utilities/event-utils.js';

// Shared card styles
import * as styles from '../card.module.css';
// Styles specific to this card type
import * as typeStyles from './card--time.module.css';

const getStatusClass = (status) => {
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

const CardTime = ({ time, classes }) => {
  if (!time) return;

  const wrapperClasses = classes ? `${classes} ${typeStyles.card}` : typeStyles.card;
  const displayTime = timeString(time);
  const costOption = (time.costOption)
                      && time.costOption === 'Requires Payment'
                      ? null
                      : time.costOption;

  return (
    <div className={wrapperClasses}>
      <div className={`${styles.body} ${typeStyles.body}`}>
        {time.status && (
          <p className={`${styles.detailPill} ${typeStyles.detailPill} ${getStatusClass(time.status)}`}>
            {time.status}
          </p>
        )}
        <div className={`${styles.content} ${typeStyles.content}`}>
          {time.title && (<h3 className={typeStyles.title}>{time.title}</h3>)}
          {displayTime && <p className={typeStyles.time}>{displayTime}</p>}
          <hr />
          {/* TODO: work out full duration events, don't show time */}
          {/* TODO: Show duration, needs getter method which is more globally shared */}
          {time.bookingRequired && (<strong>Booking required</strong>)}
          {/* TODO: More global manner of working out cost option */}
          {/* TODO: Probably want an SVG here too, maybe, possibly. Kinda depends on event cards */}
          {costOption && (<em>{costOption}</em>)}
          {time.cost && (<p><strong>Cost: </strong>{time.cost}</p>)}
          {time.note && (<em>{time.note}</em>)}
          {/* Booking info is only ever shown on time cards. Not shown if time is cancelled */}
          {(time.bookingInfo?.raw && time.status !== 'Cancelled' && time.status !== 'Fully booked') && (
            <span className={typeStyles.bookingInfo}>{renderRichText(time.bookingInfo)}</span>
          )}
          {/* TODO: Add to Calendar (Button) */}
        </div>
      </div>
    </div>
  );
};

export default CardTime;
