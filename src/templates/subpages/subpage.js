import React from 'react';
import { Link, graphql } from 'gatsby';
import get from 'lodash/get';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import { Seo } from '../../components/shared';
import { Layout, Hero } from '../../components';
import * as styles from './subpage.module.css';

class SubpageTemplate extends React.Component {
  render() {
    const post = get(this.props, 'data.contentfulBlogPost');
    const seo = post.seo;

    const plainTextIntro = post.intro?.raw && documentToPlainTextString(JSON.parse(post.intro.raw));
    const plainTextContent = post.content?.raw && documentToPlainTextString(JSON.parse(post.content.raw));
    // Styles the article and hero. Can be "full-page" or "flex"
    const heroVariant = 'full-page';

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

    return (
      <Layout location={this.props.location}>
        <Seo
          title={seo?.title || post.title}
          description={seo?.description || plainTextIntro || plainTextContent}
          imageUrl={seo?.img?.url || post.bannerImg?.img?.url}
          keywords={seo?.keywords}
          robots={seo?.allowRobots}
          noRobotsTagIDs={seo?.noRobotsTagIDs}
          entryTags={post.metadata?.tags}
        />
        <Hero
          altImage={post.bannerImg}
          title={post.title}
          variant={heroVariant}
          usesRichtext={false}
        />
        <div className={`${styles.container} ${heroVariant === 'full-page' && styles.useFullPageHero}`}>
          <div className={styles.article}>
            <div className={styles.body}>
              {/* Image attribution */}
              {post.bannerImg?.note?.note && (
                <p className={styles.attribution}>
                  Image provided by: {post.bannerImg.note.note}
                </p>
              )}
              {/* Body content text */}
              {post.intro?.raw &&
                <div className={styles.intro}>
                  {renderRichText(post.intro, options)}
                </div>
              }
              {post.content?.raw && renderRichText(post.content, options)}

              {/* THP: Link back to parent / landing page */}
              {/* TODO: Change with link to parent */}
              <nav>
                <ul className={styles.articleNavigation}>
                    <li>
                      <Link to={`/services`}>
                        ← View More Services
                      </Link>
                    </li>
                </ul>
                </nav>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default SubpageTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug(
    $slug: String!
    $previousPostSlug: String
    $nextPostSlug: String
  ) {
    contentfulBlogPost(slug: { eq: $slug }) {
      slug
      title
      authors {
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
      publishDate(formatString: "MMMM Do, YYYY")
      rawDate: publishDate
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
      intro {
        raw
      }
      content {
        raw
        references {
          ... on ContentfulAsset {
            contentful_id
            title
            description
            gatsbyImageData(width: 1200)
            __typename
          }
        }
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
    previous: contentfulBlogPost(slug: { eq: $previousPostSlug }) {
      slug
      title
    }
    next: contentfulBlogPost(slug: { eq: $nextPostSlug }) {
      slug
      title
    }
  }
`;
