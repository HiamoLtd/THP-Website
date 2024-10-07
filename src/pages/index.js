import React from 'react';
import { graphql } from 'gatsby';
import get from 'lodash/get';

import { Seo } from '../components/shared';
import { Layout, Banner, CardGrid } from '../components';

const TEMPPurposeContent = () => (
  <>
    <p>The Heritage Practice is a Wellington-based consultancy that helps protect and manage Aotearoa's built heritage places. We work with building owners, consultants, and councils to ensure heritage sites are cared for and adapted in ways that respect their history and values.</p>
    <p>We help our clients make informed decisions on heritage matters. Our work includes heritage research, studies, policy, input into district plan provisions, heritage impact assessments and assessments of effects, conservation management, independent peer reviews, and work as an expert witness.</p>
  </>
);

const TEMPWhoWeAreContent = () => (
  <>
    <p>The Heritage Practice was established by heritage expert and registered architect, Moira Smith in 2021. Moira has more than 25 years' experience working with built heritage, both in architecture practice and local government. She is skilled in the sustainable management of heritage places, with expertise working within the RMA and the Building Act (including earthquake prone building legislation).</p>
    <p>Moira has extensive experience as a project-architect leading large-scale conservation and new-build projects in Central London. She is a subject matter expert with a master's degree in Museum & Heritage Studies, and has worked for many years as a senior heritage advisor at the Wellington City Council. She is also a certified as an Independent Hearings' Commissioner.</p>
    <a href="/about">About Us</a>
  </>
);

const TEMPServicesContent = () => (
  <>
    <p>[Meet our team, and discover how we make your heritage journey easy.]</p>
    <a href="/about">About Us</a>
  </>
);

const TEMPPurposeStatement = () => {
  const content = TEMPPurposeContent();
  return (
    <>
      <Banner
        type="cta"
        content={content}
        usesRichtext={false}
        bgColor="var(--secondary)"
      />
      {/* <Banner
        type="cta"
        bgColor="transparent"
      /> */}
    </>
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
      title: "Heritage Policy & Strategy",
      intro: "Heritage advice to local authorities.",
      imgName: "01_service_banner.jpg",
      slug: "blog/the-utaina-project/"
    },
    {
      title: "Heritage Expert",
      intro: "Heritage expert witness for built-heritage matters.",
      imgName: "02_service_banner.jpg",
      slug: "blog/the-utaina-project/"
    },
    {
      title: "Resource Consents",
      intro: "Assessments for resource consent applications.",
      imgName: "03_service_banner.jpg",
      slug: "blog/the-utaina-project/"
    },
    {
      title: "Conservation Management",
      intro: "Expert heritage advice to building owners on the care of heritage places.",
      imgName: "04_service_banner.jpg",
      slug: "blog/the-utaina-project/"
    },
    {
      title: "Heritage Projects",
      intro: "Working with RMA planners, architects, and structural engineers.",
      imgName: "05_service_banner.jpg",
      slug: "blog/the-utaina-project/"
    },
  ];
  return (
    <div id="services">
      <Banner
        type="cta"
        title="What We Do"
        content={(<><p style={{padding: '0', marginBottom: '0' }}>We offer a range of services for built heritage places.</p></>)}
        usesRichtext={false}
        bgColor="transparent"
      />
      <CardGrid
        items={serviceExampleItems}
        type="page"
        padding="var(--space-md) var(--size-gutter) var(--size-gutter)"
        maxWidth="var(--size-max-width)"
        bgColor="transparent"
      />
    </div>
  );
};

const TEMPContact = () => {
  // const content = TEMPWhoWeAreContent();
  return (
    <Banner
      type="cta"
      title="Contact Us"
      content={(<a href="mailto:info@theheritagepractice.co.nz">info@theheritagepractice.co.nz</a>)}
      usesRichtext={false}
      bgColor="var(--secondary)"
    />
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
        <TEMPContact />
        {/* {homepage.contactContent && (
          <Banner
            type="cta"
            title="CONTACT US"
            content={homepage.contactContent}
            // classes={styles.contactBanner}
            usesRichtext={true}
          />
        )} */}

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
