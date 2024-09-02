import React from 'react';
import { graphql } from 'gatsby';
import get from 'lodash/get';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import InnerHTML from 'dangerously-set-html-content'

import { Seo } from '../../components/shared';
import { Layout, Hero, Sponsors } from '../../components';
import * as styles from './basic-page.module.css';


class BasicPageTemplate extends React.Component {
  render() {
    const page = get(this.props, 'data.contentfulBasicPage');
    const seo = page.seo;

    const plainTextIntro = page.intro?.raw && documentToPlainTextString(JSON.parse(page.intro.raw));
    const plainTextContent = page.content?.raw && documentToPlainTextString(JSON.parse(page.content.raw));

    const options = {
      renderNode: {
        [BLOCKS.EMBEDDED_ASSET]: (node) => {
          const { gatsbyImageData, description } = node.data.target
          return (
            <GatsbyImage
              image={getImage(gatsbyImageData)}
              alt={description}
            />
          );
        },
        [BLOCKS.EMBEDDED_ENTRY]: (node) => {
          const html = node.data.target?.sourceCode?.sourceCode;
          return <InnerHTML html={html} />;
        },
      },
    };

    return (
      <Layout location={this.props.location}>
        <Seo
          title={seo?.title || page.title}
          description={seo?.description || plainTextIntro || plainTextContent}
          imageUrl={seo?.img?.url || page.bannerImg?.img?.url}
          keywords={seo?.keywords}
          robots={seo?.allowRobots}
          noRobotsTagIDs={seo?.noRobotsTagIDs}
          entryTags={page.metadata?.tags}
        />
        <Hero
          altImage={page.bannerImg}
          title={page.title}
          variant="banner"
          usesRichtext={false}
        />
        <div className={styles.container}>
          <div className={styles.article}>
            <div className={styles.body}>
              {/* Image attribution */}
              {page.bannerImg?.note?.note && (
                <p className={styles.attribution}>
                  Image provided by: {page.bannerImg.note.note}
                </p>
              )}
              {/* Body content text */}
              {page.intro?.raw &&
                <div className={styles.intro}>
                  {renderRichText(page.intro, options)}
                </div>
              }
              {page.content?.raw && renderRichText(page.content, options)}
            </div>
          </div>
        </div>
        {/* All basic pages display sponsors at the bottom, for now. */}
        <Sponsors />
      </Layout>
    )
  }
}

export default BasicPageTemplate;

export const pageQuery = graphql`
  query BasicPageBySlug(
    $slug: String!
  ) {
    contentfulBasicPage(slug: { eq: $slug }) {
      slug
      title
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
          ... on ContentfulEmbed {
            contentful_id
            sourceCode {
              sourceCode
            }
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
  }
`;
