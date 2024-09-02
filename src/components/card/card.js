import React from 'react';

import CardEvent from './card--event';
import CardTime from './card--time';
import CardHost from './card--host';
import CardBlog from './card--blog';

import * as styles from './card.module.css';

const getCardClasses = (size) => {
  let cardClasses = `${styles.card}`;

  switch (size) {
    case 'lg':
      cardClasses += ` ${styles.cardLg}`;
    case 'sm':
      cardClasses += ` ${styles.cardSm}`;
  }

  return cardClasses;
}

// TODO: Here is where prop types start to really matter
const Card = ({ item, type, size }) => {
  if (!item) return;

  const classes = getCardClasses(size);

  switch (type) {
    case 'event':
    case 'events':
      return <CardEvent event={item} classes={classes} />;
    case 'time':
    case 'times':
      return <CardTime time={item} classes={classes} />;
    case 'host':
    case 'hosts':
      return <CardHost host={item} classes={classes} />;
    // case 'form':
    //   return <CardForm form={item} classes={classes} />;
    default:
      return <CardBlog post={item} classes={classes} />;
  }
};

export default Card;
