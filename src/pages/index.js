import React from 'react';
import { graphql } from 'gatsby';
import get from 'lodash/get';

import { Seo } from '../components/shared';
import { Layout, Banner, CardGrid } from '../components';

const TEMPPurposeContent = () => (
  <>
    <p>[The Heritage Practice is a Wellington-based consultancy that helps protect and manage Aotearoa's heritage places. We work with building owners, architects, and councils to ensure heritage sites are cared for and adapted in ways that respect their history.</p>
    <p>Our services include writing conservation plans, supporting resource consents, and giving expert advice on heritage projects, helping to protect the taonga of our past for future generations.]</p>
  </>
);

const TEMPWhoWeAreContent = () => (
  <>
    <p>[Meet our team, and discover how we make your heritage journey easy.]</p>
    <a href="/about">About Us</a>
  </>
);

const TEMPPurposeStatement = () => {
  const content = TEMPPurposeContent();
  return (
    <Banner
      type="cta"
      content={content}
      usesRichtext={false}
    />
  );
};

const TEMPWhoWeAre = () => {
  const content = TEMPWhoWeAreContent();
  return (
    <Banner
      type="columns"
      title="Who We Are"
      content={content}
      usesRichtext={false}
    />
  );
};

const TEMPServices = () => {
  const serviceExampleItems = [
    {
      title: "[Service One]",
      intro: "[This is an intro for service one.]",
      imgName: "service_1.jpg"
    },
    {
      title: "[Service Two]",
      intro: "[This is an intro for service two.]",
      imgName: "service_2.jpg"
    },
    {
      title: "[Service Three]",
      intro: "[This is an intro for service three.]",
      imgName: "service_3.jpg"
    },
  ];
  return (
    <>
      <Banner
        type="cta"
        title="What We Do"
      />
      <CardGrid
        items={serviceExampleItems}
        type="page"
        padding="0 var(--size-gutter)"
        maxWidth="var(--size-max-width)"
        bgColor="var(--secondary)"
      />
    </>
  );
};

class RootIndex extends React.Component {
  render() {
    const homepage = get(this, 'props.data.contentfulHomepage');
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
          content={homepage.bannerContent?.bannerContent}
          image={homepage.bannerImage}
        />
        {/* THP - Purpose Statement Section */}
        <TEMPPurposeStatement />
        {/* THP - Who We Are Section */}
          {/* TODO: Brief into text, photo, link to about page */}
        <TEMPWhoWeAre />
        
        {/* THP - Services We Provide Section */}
        {/* TODO: Three sections, title, description, link for each one? Or just link to services page? */}
        {/* TODO: Services page? */}
        <TEMPServices />

        {/* THP - Contact Section */}
        {/* TODO: Do we want this? */}
        {homepage.contactContent && (
          <Banner
            type="cta"
            title="CONTACT US"
            content={homepage.contactContent}
            // classes={styles.contactBanner}
            usesRichtext={true}
          />
        )}

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
        {/* Sponsors */}
        {/* <Sponsors /> */}

        {/* TODO: */}
      </Layout>
    )
  }
};

export default RootIndex;

export const pageQuery = graphql`
  query HomeQuery {
    contentfulHomepage {
      title
      bannerContent {
        bannerContent
      }
      bannerImage {
        url
      }
      ctaContent {
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
  }
`
