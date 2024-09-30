import React from 'react';
import { Link, graphql } from 'gatsby';
import get from 'lodash/get';
import { renderRichText } from 'gatsby-source-contentful/rich-text';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import { Seo } from '../../components/shared';
import { Layout, Hero } from '../../components';
import * as styles from './subpageHC.module.css';

const HardcodedIntro = () => {
  return (
    <div className={styles.intro}>
    <p>[A longer introduction to this service. It will always be bolded, and may be one to three sentences long.]</p>
    </div>
  )
}

const HardcodedContent = () => {
  return (
    <>
    <p>[A content block discussing the service. This may explain what the service is, how it is offered, and the benefits of it.]</p>
    <p>[This content could include links, or image panels showing examples of the service. Note: The image panels have not yet been mocked up, but can be if requested.]</p>
    <p>[Please let me know if the image panels would be of use - they would have an image on one side and "content" on the other explaining what it is in the image.]</p>
    <p>[This could be useful for providing visual examples of services.]</p>
    <p>[Note: The site is currently built on the assumption that there will be 3 services offered, but it will be able to handle more.]</p>
    </>
  )
}

class SubpageHCTemplate extends React.Component {
  render() {
    // const post = get(this.props, 'data.contentfulBlogPost');
    // const seo = post.seo;

    // const previous = get(this.props, 'data.previous');
    // const next = get(this.props, 'data.next');

    // const plainTextIntro = post.intro?.raw && documentToPlainTextString(JSON.parse(post.intro.raw));
    // const plainTextContent = post.content?.raw && documentToPlainTextString(JSON.parse(post.content.raw));
    // Styles the article and hero. Can be "full-page" or "flex"
    const heroVariant = 'full-page';

    // const options = {
    //   renderNode: {
    //     [BLOCKS.EMBEDDED_ASSET]: (node) => {
    //     const { gatsbyImageData, description } = node.data.target
    //     return (
    //        <GatsbyImage
    //           image={getImage(gatsbyImageData)}
    //           alt={description}
    //        />
    //      )
    //     },
    //   },
    // };

    return (
      <Layout location={this.props.location}>
        {/* <Seo
          title={seo?.title || post.title}
          description={seo?.description || plainTextIntro || plainTextContent}
          imageUrl={seo?.img?.url || post.bannerImg?.img?.url}
          keywords={seo?.keywords}
          robots={seo?.allowRobots}
          noRobotsTagIDs={seo?.noRobotsTagIDs}
          entryTags={post.metadata?.tags}
        /> */}
        <Hero
          hardcodedImageUrl={"/images/service_1.jpg"}
          // altImage={post.bannerImg}
          title={"Service One Example"}
          variant={heroVariant}
        />
        <div className={`${styles.container} ${heroVariant === 'full-page' && styles.useFullPageHero}`}>
          <div className={styles.article}>
            <div className={styles.body}>
              {/* Image attribution */}
              {/* TODO: Removed for hardcoded version. Likely not needed in general */}
              {/* {post.bannerImg?.note?.note && (
                <p className={styles.attribution}>
                  Image provided by: {post.bannerImg.note.note}
                </p>
              )} */}
              {/* Body content text */}
              {/* TODO: Hardcoded for now, intro passed in straight */}
              <HardcodedIntro />
              {/* {post.intro?.raw &&
                <div className={styles.intro}>
                  {renderRichText(post.intro, options)}
                </div>
              } */}
              {/* TODO: Hardcoded for now, content passed in straight */}
              <HardcodedContent />
              {/* {post.content?.raw && renderRichText(post.content, options)} */}

              {/* Previous and next article controls */}
              {/* TODO: Change with link to parent */}
              <nav>
                <p>&nbsp;</p>
                  <ul className={styles.articleNavigation}>
                      <li>
                        <Link to={`/#services`}>
                          ← View More Services
                        </Link>
                      </li>
                  </ul>
                </nav>
              {/* {(previous || next) && (
                <nav>
                  <ul className={styles.articleNavigation}>
                    {previous && (
                      <li>
                        <Link to={`/blog/${previous.slug}`} rel="prev">
                          ← {previous.title}
                        </Link>
                      </li>
                    )}
                    {next && (
                      <li>
                        <Link to={`/blog/${next.slug}`} rel="next">
                          {next.title} →
                        </Link>
                      </li>
                    )}
                  </ul>
                </nav>
              )} */}
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default SubpageHCTemplate;

// export const pageQuery = graphql`
//   query BlogPostBySlug(
//     $slug: String!
//     $previousPostSlug: String
//     $nextPostSlug: String
//   ) {
//     contentfulBlogPost(slug: { eq: $slug }) {
//       slug
//       title
//       authors {
//         id
//         name
//         description {
//           description
//         }
//         email
//         phone
//         website
//         facebookUrl
//         instagramUrl
//         linkedInUrl
//         twitterUrl
//         tikTokUrl
//       }
//       publishDate(formatString: "MMMM Do, YYYY")
//       rawDate: publishDate
//       bannerImg {
//         img {
//           gatsbyImage(
//             layout: FULL_WIDTH
//             placeholder: DOMINANT_COLOR
//             width: 480
//             height: 270
//           )
//           url
//         }
//         alt
//       }
//       intro {
//         raw
//       }
//       content {
//         raw
//         references {
//           ... on ContentfulAsset {
//             contentful_id
//             title
//             description
//             gatsbyImageData(width: 1200)
//             __typename
//           }
//         }
//       }
//       metadata {
//         tags {
//           contentful_id
//         }
//       }
//       seo {
//         allowRobots
//         description
//         keywords
//         title
//         img {
//           url
//         }
//         noRobotsTagIDs
//       }
//     }
//     previous: contentfulBlogPost(slug: { eq: $previousPostSlug }) {
//       slug
//       title
//     }
//     next: contentfulBlogPost(slug: { eq: $nextPostSlug }) {
//       slug
//       title
//     }
//   }
// `;
