const path = require('path');

// Pull pages of a given type from Contentful
const asyncGetContentfulPages = async (graphql, reporter, requestType, filterOptions = null) => {
  const result = await graphql(
    `
      {
        ${requestType}${filterOptions ? ' (sort: {' + filterOptions + '})' : ''} {
          nodes {
            title
            slug
          }
        }
      }
    `
  );

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your Contentful items`,
      result.errors
    );
    return;
  }

  return result.data[requestType].nodes;
}

// Pull redirects from Contentful
const asyncGetContentfulRedirects = async (graphql, reporter) => {
  const result = await graphql(
    `
      {
        allContentfulRedirect {
          nodes {
            fromPath
            toUrl
            permanent
          }
        }
      }
    `
  );

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your Contentful redirects`,
      result.errors
    );
    return;
  }

  return result.data['allContentfulRedirect'].nodes;
}

// TODO: Ideally, this should be a reusable method used for all contentful loading
// TODO: Could join with this? ${nodeData?.join('\n') || 'id'}
// TODO: Issue of getting sub fields. May not be tidiest code.
// Pull items  of a given type from Contentful
const asyncGetContentfulFileLink = async (graphql, reporter) => {
  const result = await graphql(
    `
      {
        allContentfulFileLink {
          nodes {
            slug
            file {
              url
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your Contentful items`,
      result.errors
    );
    return;
  }

  return result.data['allContentfulFileLink'].nodes;
}

// Build pages for each page in the list, using the given template.
const createPagesFromList = (actions, list, prePath, template, linkAdjacentPosts) => {
  const { createPage } = actions;

  list.forEach((page, index) => {
    const full_slug = prePath ? `${prePath}/${page.slug}/` : `${page.slug}/`;

    console.log('SLUG:', full_slug);

    // Context is passed to the template. Some pages may have different required data.
    // `context` is available in the template as a prop and as a variable in GraphQL
    let context = {
      slug: page.slug
    };
    // Add data for pages which link neighbour pages, like blog posts.
    if (linkAdjacentPosts) {
      const previousPostSlug = index === 0 ? null : list[index - 1].slug;
      const nextPostSlug = index === list.length - 1 ? null : list[index + 1].slug;
      context['previousPostSlug'] = previousPostSlug;
      context['nextPostSlug'] = nextPostSlug;
    }

    createPage({
      path: full_slug,
      component: template,
      context: context,
    });
  });
}

// Add paths to the Netlify redirects file for each redirect in Contentful.
const createRedirectsFromList = (actions, list) => {
  const { createRedirect } = actions;

  list.forEach((redirect) => {
    console.log(`REDIRECT: { fromPath: "${redirect.fromPath}", toPath: "${redirect.toUrl}", isPermanent: "${redirect.permanent}"}`); 

    if (!redirect.fromPath || !redirect.toUrl) {
      console.error(`ERROR - REDIRECT FAILED. Retrying deployment after clearing the cache may solve the issue.`); 
      return;
    }

    createRedirect({
      fromPath: redirect.fromPath,
      toPath: redirect.toUrl,
      isPermanent: redirect.permanent
    });
  });
}

// TODO: Ideally should be joined with the above method
// Add paths to the Netlify redirects file for each File Link in Contentful.
const createFileLinksFromList = (actions, list) => {
  const { createRedirect } = actions;

  list.forEach((link) => {
    const fileSlug = `/file/${link.slug}`;
    const fileLocationUrl = link.file?.url;
    console.log(`FILE LINK: { fromPath: "${fileSlug}", toPath: "${fileLocationUrl}"}`); 

    createRedirect({
      fromPath: fileSlug,
      toPath: fileLocationUrl
    });
  });
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  // -----------------------------
  // BLOG POST TEMPLATES & LOADING
  // -----------------------------
  //
  // Define a template for blog post
  const blogPostTemplate = path.resolve('./src/templates/blogs/blog-post.js');

  // Gather blog post data from Contentful
  console.log('Gathering blog posts...');
  const blogPosts = await asyncGetContentfulPages(graphql, reporter, 'allContentfulBlogPost', 'publishDate: DESC');

  // Create blog posts pages, if there's at least one blog post found in Contentful
  if (blogPosts === null) console.log('Error gathering blog posts. Skipping blog creation.');
  else if (blogPosts.length === 0) console.log('No blog posts found.');
  else if (blogPosts.length > 0) {
    console.log(`Creating ${blogPosts?.length} blog post pages...`);
    createPagesFromList(actions, blogPosts, '/blog', blogPostTemplate, true);
    console.log(`Blog posts complete.`);
  }


  // --------------------------
  // EVENTS TEMPLATES & LOADING
  // --------------------------
  // const eventPageTemplate = path.resolve('./src/templates/events/event.js');

  // console.log('Gathering event pages...');
  // const events = await asyncGetContentfulPages(graphql, reporter, 'allContentfulEvent');

  // if (events === null) console.log('Error gathering events. Skipping events creation.');
  // else if (events.length === 0) console.log('No events found.');
  // else if (events.length > 0) {
  //   console.log(`Creating ${events?.length} event pages...`);
  //   createPagesFromList(actions, events, '/event', eventPageTemplate, false);
  //   console.log(`Event pages complete.`);
  // }


  // --------------------------------
  // LANDING PAGE TEMPLATES & LOADING
  // --------------------------------
  // const landingPageTemplate = path.resolve('./src/templates/landing-page/landing-page.js');

  // console.log('Gathering landing pages...');
  // const landingPages = await asyncGetContentfulPages(graphql, reporter, 'allContentfulLandingPage');

  // if (landingPages === null) console.log('Error gathering landing pages. Skipping landing page creation.');
  // else if (landingPages.length === 0) console.log('No landing pages found.');
  // else if (landingPages.length > 0) {
  //   console.log(`Creating ${landingPages?.length} landing pages...`);
  //   createPagesFromList(actions, landingPages, null, landingPageTemplate, false);
  //   console.log(`Landing pages complete.`);
  // }


  // ------------------------------
  // BASIC PAGE TEMPLATES & LOADING
  // ------------------------------
  //
  // Define a template for basic pages
  const basicPageTemplate = path.resolve('./src/templates/basic-page/basic-page.js');

  // Gather basic page data from Contentful
  console.log('Gathering basic pages...');
  const basicPages = await asyncGetContentfulPages(graphql, reporter, 'allContentfulBasicPage');

  // Create basic pages, if there's at least one basic page found in Contentful
  if (basicPages === null) console.log('Error gathering basic pages. Skipping basic page creation.');
  else if (basicPages.length === 0) console.log('No basic pages found.');
  else if (basicPages.length > 0) {
    console.log(`Creating ${basicPages?.length} basic pages...`);
    createPagesFromList(actions, basicPages, null, basicPageTemplate, false);
    console.log(`Basic pages complete.`);
  }


  // --------------------------
  // REDIRECTS ADDED TO NETLIFY
  // --------------------------
  //
  // Add redirects to Netlify's redirect file via gatsby-plugin-netlify
  const redirects = await asyncGetContentfulRedirects(graphql, reporter);

  if (redirects === null) console.log('Error gathering redirects. Skipping redirect creation.');
  else if (redirects.length === 0) console.log('No redirects found.');
  else if (redirects.length > 0) {
    console.log(`Creating ${redirects?.length} redirects...`);
    createRedirectsFromList(actions, redirects);
    console.log(`Redirects complete.`);
  }
  

  // ----------------------------------------------
  // REDIRECTS TO SPECIFIED ASSETS ADDED TO NETLIFY
  // ----------------------------------------------
  //
  // Add links to uploaded assets / files
  // Add redirects to Netlify's redirect file via gatsby-plugin-netlify
  const fileLinks = await asyncGetContentfulFileLink(graphql, reporter);

  if (fileLinks === null) console.log('Error gathering file links. Skipping File Link creation.');
  else if (fileLinks.length === 0) console.log('No file links found.');
  else if (fileLinks.length > 0) {
    console.log(`Creating ${fileLinks?.length} file links...`);
    createFileLinksFromList(actions, fileLinks);
    console.log(`File links complete.`);
  }
}
