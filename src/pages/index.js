import React from 'react';
import { graphql } from 'gatsby';
import get from 'lodash/get';

import { Seo } from '../components/shared';
import { Layout, Banner, CardGrid } from '../components';

const IntroBanner = ({ content }) => {
  if (!content) return;
  return (
    <Banner
      type="cta"
      content={content}
      usesRichtext={true}
      bgColor="var(--secondary)"
    />
  );
}

const WhoWeAreBanner = ({ content, image }) => {
  if (!content) return;
  return (
    <Banner
      type="columns"
      title="Who We Are"
      content={content}
      image={image}
      usesRichtext={true}
      id="about"
    />
  );
};

const FeaturedGridSection = ({ title, content, featuredItems }) => {
  return (
    <div id="services">
      <Banner
        type="cta"
        title={title}
        content={content}
        usesRichtext={true}
        bgColor="transparent"
      />
      <CardGrid
        items={featuredItems}
        slugPrefix="service"
        type="page"
        layout="wide"
        padding="var(--space-md) var(--size-gutter) var(--size-gutter)"
        maxWidth="var(--size-max-width)"
        bgColor="transparent"
      />
    </div>
  );
}

const ContactBanner = ({ content }) => {
  if (!content) return;
  return (
    <Banner
      type="cta"
      title="CONTACT US"
      content={content}
      usesRichtext={true}
      bgColor="var(--secondary)"
      id="contact"
    />
  );
}


class RootIndex extends React.Component {
  render() {
    const homepage = get(this, 'props.data.contentfulHomepage');
    const services = get(this, 'props.data.allContentfulBlogPost.nodes');
    const seo = homepage.seo;

    return (
      <Layout location={this.props.location}>
        <Seo
          title={seo?.title || homepage.title}
          description={seo?.description || "The Heritage Practice is here to help you."}
          imageUrl={seo?.img?.url || homepage.bannerImg?.img?.url}
          keywords={seo?.keywords}
          robots={seo?.allowRobots}
        />
        {/* Image banner with text */}
        <Banner
          type="homepage-inline"
          title={"The Heritage Practice"}
          image={homepage.bannerImage}
        />

        {/* THP - Purpose Statement Section */}
        <IntroBanner content={homepage.ctaContent} />
        {/* THP - Who We Are Section */}
        <WhoWeAreBanner content={homepage.whoWeAreContent} image={homepage.whoWeAreImg} />
        {/* THP - Services We Provide Section */}
        <FeaturedGridSection
          title={homepage.featuredGridTitle}
          content={homepage.featuredGridContent}
          featuredItems={services}
        />

        {/* THP - Contact Section */}
        <ContactBanner content={homepage.contactContent} />

        {/* TODO: "What we're involved with"? */}

        {/* Newsletter signup */}
        {/* <NewsletterSignup /> */}
        {/* Contact Call To Action banner */}
        {/* {homepage.contactContent && (
          <Banner
            type="cta"
            title="Contact Us"
            content={homepage.contactContent}
            usesRichtext={true}
          />
        )} */}

        {/* TODO: */}
      </Layout>
    )
  }
};

export default RootIndex;

export const pageQuery = graphql`
  query HomeQuery {
    contentfulHomepage {
      bannerImage {
        url
      }
      ctaContent {
        raw
      }
      whoWeAreContent {
        raw
      }
      whoWeAreImg {
        img {
          gatsbyImage(
            layout: FULL_WIDTH
            placeholder: DOMINANT_COLOR
            width: 1200
          )
        }
        alt
      }
      featuredGridTitle
      featuredGridContent {
        raw
      }
      contactContent {
        raw
      }
      seo {
        allowRobots
        description
        keywords
        title
        img {
          url
        }
      }
    }
    allContentfulBlogPost(
      filter: {metadata: {tags: {elemMatch: {contentful_id: {in: "service"}}}}}
      sort: {publishDate: DESC}
    ) {
      nodes {
        title
        slug
        bannerImg {
          img {
            gatsbyImage(
              layout: FULL_WIDTH
              placeholder: DOMINANT_COLOR
              width: 480
              height: 270
            )
          }
          alt
        }
        cardIntro
      }
    }
  }
`
