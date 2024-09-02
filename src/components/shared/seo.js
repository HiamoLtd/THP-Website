import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

// Ensure the canonical URL goes to a full correct URL
const getFullCanonicalUrl = (canonicalUrl, siteUrl, siteShortUrl) => {
  if (canonicalUrl?.size > 0) {
    if (canonicalUrl.startsWith('http'))
      return canonicalUrl;
    // Forgot "http" / "https"
    else if (canonicalUrl.startsWith('www.'))
      return `https://${canonicalUrl}`;
    // Forgot "http(s)" or "www"
    else if (canonicalUrl.startsWith(siteShortUrl))
      return canonicalUrl.replace(siteShortUrl, siteUrl);
    // Assume / means internal path
    else if (canonicalUrl.startsWith('/'))
      return `${siteUrl}${canonicalUrl}`;
    // Contains web address before path, assume external
    else if (canonicalUrl.split('/')[0]?.contains('.'))
      return `https://${canonicalUrl}`;
    // Assume internal address without proper path, like "event/test-page"
    return `${siteUrl}/${canonicalUrl}`;
  }
}

// Add "Robots" tags based on if this page has blocked tag ID's or if roots are blocked
const getRobots = (robots, noRobotsTags, entryTags = []) => {
  if (
    noRobotsTags && noRobotsTags.length > 0 &&
    entryTags && entryTags.length > 0 &&
    noRobotsTags.some((tId) => entryTags.some((e) => e.contentful_id === tId))
  ) {
    return 'noindex, nofollow';
  } else if (robots === false) {
    return 'noindex, nofollow';
  } else {
    return 'index, follow';
  }
}

const Seo = ({
  lang = 'en',
  title,
  description,
  imageUrl,
  robots = true,
  noRobotsTagIDs = [],
  keywords = [],
  canonicalUrl,
  path,
  entryTags = []
}) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
            siteShortUrl
            imagePath
          }
        }
      }
    `
  );

  // TODO: REMOVE
  // TODO: TEMPORARY CODE TO ADD "events2023" to the blocked from SEO list
  // TODO: TEMPOARY CODE TO ADD "preview" TO THE BLOCKED FROM SEO LIST
  const defaultBlockedTags = ['preview', 'events2023'];
  noRobotsTagIDs = noRobotsTagIDs ? noRobotsTagIDs.concat(defaultBlockedTags) : defaultBlockedTags;

  const siteUrl = site.siteMetadata?.siteUrl;

  const siteTitle = site.siteMetadata?.title;
  const metaDescription = description || site.siteMetadata?.description;
  const metaImage = imageUrl || `${siteUrl}${site.siteMetadata?.imagePath}`;
  const metaRobots = getRobots(robots, noRobotsTagIDs, entryTags);
  const metaKeywords = keywords ? keywords.join(', ') : [];
  const metaCanonicalUrl = canonicalUrl ? getFullCanonicalUrl(canonicalUrl, siteUrl, site.siteMetadata?.siteShortUrl)
                                        : path && `${siteUrl}${path}`;
  const linkList = metaCanonicalUrl && [{ rel: `canonical`, href: metaCanonicalUrl }];


  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      defaultTitle={siteTitle}
      titleTemplate={siteTitle ? `%s | ${siteTitle}` : null}
      meta={[
        {
          name: `robots`,
          content: metaRobots
        },
        {
          name: `googlebot`,
          content: metaRobots
        },
        {
          name: `description`,
          content: metaDescription
        },
        {
          name: `image`,
          content: metaImage
        },
        {
          name: `keywords`,
          content: metaKeywords
        },
        {
          property: `og:title`,
          content: title
        },
        {
          property: `og:description`,
          content: metaDescription
        },
        {
          property: `og:type`,
          content: `website`
        },
        {
          property: `og:image`,
          content: metaImage
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`
        },
        {
          name: `twitter:title`,
          content: title
        },
        {
          name: `twitter:description`,
          content: metaDescription
        },
      ]}
      link = {
        linkList
      }
    />
  );
}

export default Seo;
