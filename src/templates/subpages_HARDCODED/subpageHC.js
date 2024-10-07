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
    <p>We work with local authorities on heritage strategies and guidance, district plan heritage provisions, heritage surveys, and heritage design guides</p>
    </div>
  )
}

const HardcodedContent = () => {
  return (
    <>
    <h3>Heritage policies and strategies</h3>
    <p>We have extensive experience working in and with local authorities and provide expert advice on heritage policies and strategies.</p>
    {/* <p>&nbsp;</p> */}
    <h3>District Plan heritage provisions</h3>
    <p>Heritage buildings benefit from being kept in a sustainable ongoing use and can adapted for a suitable reuse. We work with RMA planners writing district plan heritage provisions and provide practical advice on enabling positive heritage outcomes.</p>
    {/* <p>&nbsp;</p> */}
    <h3>Heritage surveys and inventories</h3>
    <p>Heritage studies assist local authorities in identifying heritage places so that historic heritage values can be managed and protected. We undertake research and provide historic heritage evaluations of a single property, suburbs, or groups of heritage places that are linked by a similar history, historic theme, patterns of use, type, or physical appearance.</p>
    {/* <p>&nbsp;</p> */}
    <h3>Design guides</h3>
    <p>Design guides help local authorities explain the intent of district plan heritage provisions and demonstrate ‘what good looks like’.  We work with planners, urban designers, and graphic designers to produce heritage design guides.</p>
    {/* <p>&nbsp;</p> */}
    <h3>Expert peer review</h3>
    <p>We assist local authorities when they make decisions on resource consent applications for heritage buildings. We act technical experts and provide an independent peer review Heritage Impact Assessments and Assessments of Environmental Effects. We can also appear as a heritage expert for notified hearings, appeals, and judicial reviews.</p>
    <p>&nbsp;</p>
    <h4>Examples of our work:</h4>
    <ul>
      <li>
        <p>
          <a href="https://wellington.govt.nz/-/media/arts-and-culture/heritage/files/guide-to-seismic-strengthening-for-heritage-building-owners.pdf?la=en&hash=A5F0D0F2D90CFBF1970C05E327AC21C6439102BA">
            Guide to Seismic Strengthening for Heritage Building Owners.
          </a>
        </p>
      </li>
      <li>
        <p>
          <a href="https://wellington.govt.nz/-/media/arts-and-culture/heritage/files/heritage-shop-fronts.pdf">
            Heritage shop fronts: A guide to maintaining and enhancing Wellington's historic shops
          </a>
        </p>
      </li>
      <li>
        <p>
          <a href="https://www.building.govt.nz/assets/Uploads/building-code-compliance/b-stability/b1-structure/guidance-securing-parapets-facades.pdf">
            Heritage input into the GUIDANCE:  Securing parapets and facades on unreinforced masonry buildings: Advice for building owners, councils and engineers
          </a>
        </p>
      </li>
    </ul>
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
          hardcodedImageUrl={"/images/01_service_banner.jpg"}
          // altImage={post.bannerImg}
          title={"Heritage policy and strategy"}
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
