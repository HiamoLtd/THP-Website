import React from 'react'

const Container = ({
  children,
  as = 'div',
  bgColor = 'var(--white)',
  maxWidth = 'var(--size-max-width)',
  padding = 'var(--space-2xl) var(--size-gutter)',
  overflow = 'hidden',
  position = 'relative',
  classes = ''
}) => {
  const Tag = as;

  // TODO: Colours, like bgColor, could be set using "primary" instead of "Var(--". Maybe read to see if starts with hash?
  return (
    <Tag
      style={{
        width: '100%',
        overflow: overflow,
        padding: padding,
        backgroundColor: bgColor,
        position: position
      }}
      className={classes}
    >
      <div style={{
          width: '100%',
          maxWidth: maxWidth,
          margin: '0 auto',
          display: 'inherit'
        }}>
      {children}
      </div>
    </Tag>
  )
}

export default Container
