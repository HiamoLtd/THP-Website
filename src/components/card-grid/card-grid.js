import React from 'react';

import { Container } from '../shared';
import Card from '../card';
import * as styles from './card-grid.module.css';


const applyFilters = (items, acceptTags, blockTags, hideChildren) => {
  if (!items) return [];
  // TODO: CHeck for hide children
  if (!acceptTags && !blockTags) return items; 

  const filteredItems = items.filter(item => {
    if (!item) return false;

    const tags = item.metadata?.tags;
    // Remove item if it has a hidden tag
    if (
      blockTags?.length > 0 &&
      (tags && blockTags.some((blockTag) => tags.some((t) => t.contentful_id === blockTag)))
    ) {
      return false;
    }
    // Remove item if it does not contain ALL of the "acceptTags" list
    if (
      acceptTags?.length > 0 &&
      (!tags || !acceptTags.every((acceptTag) => tags.some((t) => t.contentful_id === acceptTag)))
    ) {
      return false;
    }
    // Remove item if it has a parent, but we are hiding children
    // TODO: Get children data somehow. May need to use alpha contentful tool
    // if (hideChildren) {
    //   return false;
    // }

    // All checks passed, return true
    return true;
  });

  return filteredItems;
}

// TODO: Add card sorting
const CardGrid = ({
  items,
  type,
  bgColor = "#F5F5F5",
  layout,
  padding,
  overflow,
  acceptTags,
  blockTags,
  hideChildren = false
}) => {
  if (!items) return null;
  if (!Array.isArray(items)) return null;

  let gridClasses = styles.cardGrid;
  if (layout) {
    const ucLayout = layout.charAt(0).toUpperCase() + layout.slice(1);
    gridClasses = gridClasses + ` ${styles[`cardGrid${ucLayout}`]}`
  }

  const displayItems = applyFilters(items, acceptTags, blockTags, hideChildren);

  // console.log('Ret:', displayItems, items, acceptTags, blockTags, hideChildren);

  // TODO: Consider blurring repeat bg of wrong sized images? Could also jus hard resize in Gatsby
  return (
    <Container
      bgColor={bgColor}
      maxWidth="none"
      padding={padding}
      overflow={overflow}
    >
      <div className={gridClasses}>
        {/* TODO: Filter out all cards that are tagged in */}
        {/* TODO: Add all cards to this list, then only display those tagged to display */}
        {/* TODO: Add in some methods for displaying based on filters */}
        {displayItems.map((item, index) => {
          return (
            <Card
              item={item}
              type={type}
              key={`${type}-${index}`}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default CardGrid;
