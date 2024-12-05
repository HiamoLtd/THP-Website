const path = require('path');

// Pull pages of a given type from Contentful
const asyncGetContentfulPages = async (graphql, reporter, requestType, sortOptions, filterOptions) => {
  const result = await graphql(
    `
    {
      ${requestType}
      ${(sortOptions || filterOptions) ? `(
        ${sortOptions ? 'sort: {' + sortOptions + '}' : ''}
        ${filterOptions ? 'filter: {' + filterOptions + '}' : ''}
      )` : ''} {
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

const createBlogPostPages = async (graphql, actions, reporter) => {
  // Define a template for blog post
  const blogPostTemplate = path.resolve('./src/templates/blogs/blog-post.js');

  // Gather blog post data from Contentful
  // THP SITE NOTE: Filters out any pages tagged "service", as these are loaded in createServicePages.
  console.log('Gathering blog posts, but not "service" posts...');
  const blogPosts = await asyncGetContentfulPages(
                            graphql,
                            reporter,
                            'allContentfulBlogPost',
                            'publishDate: DESC',
                            'metadata: {tags: {elemMatch: {contentful_id: {nin: "service"}}}}'
                          );

  // Create blog posts pages, if there's at least one blog post found in Contentful
  if (!blogPosts) console.log('Error gathering blog posts. Skipping blog creation.');
  else if (blogPosts.length === 0) console.log('No blog posts found.');
  else if (blogPosts.length > 0) {
    console.log(`Creating ${blogPosts?.length} blog post pages...`);
    createPagesFromList(actions, blogPosts, '/blog', blogPostTemplate, true);
    console.log(`Blog posts complete.`);
  }
}

const createServicePages = async (graphql, actions, reporter) => {
  // Define a template for service pages
  const servicePageTemplate = path.resolve('./src/templates/subpages/subpage.js');

  // Gather blog post data from Contentful
  // THP SITE NOTE: Filters out any pages tagged "service", as these are loaded in createServicePages.
  console.log('Gathering service pages, i.e. blog posts tagged "service"...');
  const services = await asyncGetContentfulPages(
                            graphql,
                            reporter,
                            'allContentfulBlogPost',
                            'publishDate: DESC',
                            'metadata: {tags: {elemMatch: {contentful_id: {eq: "service"}}}}'
                          );

  // Create blog posts pages, if there's at least one blog post found in Contentful
  if (!services) console.log('Error gathering service pages. Skipping service creation.');
  else if (services.length === 0) console.log('No service pages found.');
  else if (services.length > 0) {
    console.log(`Creating ${services?.length} service pages...`);
    createPagesFromList(actions, services, '/service', servicePageTemplate, true);
    console.log(`Service pages complete.`);
  }
}

const createEventPages = async (graphql, actions, reporter) => {
  const eventPageTemplate = path.resolve('./src/templates/events/event.js');

  console.log('Gathering event pages...');
  const events = await asyncGetContentfulPages(graphql, reporter, 'allContentfulEvent');

  if (!events) console.log('Error gathering events. Skipping events creation.');
  else if (events.length === 0) console.log('No events found.');
  else if (events.length > 0) {
    console.log(`Creating ${events?.length} event pages...`);
    createPagesFromList(actions, events, '/event', eventPageTemplate, false);
    console.log(`Event pages complete.`);
  }
}

const createLandingPages = async (graphql, actions, reporter) => {
  const landingPageTemplate = path.resolve('./src/templates/landing-page/landing-page.js');

  console.log('Gathering landing pages...');
  const landingPages = await asyncGetContentfulPages(graphql, reporter, 'allContentfulLandingPage');

  if (!landingPages) console.log('Error gathering landing pages. Skipping landing page creation.');
  else if (landingPages.length === 0) console.log('No landing pages found.');
  else if (landingPages.length > 0) {
    console.log(`Creating ${landingPages?.length} landing pages...`);
    createPagesFromList(actions, landingPages, null, landingPageTemplate, false);
    console.log(`Landing pages complete.`);
  }
}

const createBasicPages = async (graphql, actions, reporter) => {
  // Define a template for basic pages
  const basicPageTemplate = path.resolve('./src/templates/basic-page/basic-page.js');

  // Gather basic page data from Contentful
  console.log('Gathering basic pages...');
  const basicPages = await asyncGetContentfulPages(graphql, reporter, 'allContentfulBasicPage');

  // Create basic pages, if there's at least one basic page found in Contentful
  if (!basicPages) console.log('Error gathering basic pages. Skipping basic page creation.');
  else if (basicPages.length === 0) console.log('No basic pages found.');
  else if (basicPages.length > 0) {
    console.log(`Creating ${basicPages?.length} basic pages...`);
    createPagesFromList(actions, basicPages, null, basicPageTemplate, false);
    console.log(`Basic pages complete.`);
  }
}

const createNetlifyRedirects = async (graphql, actions, reporter) => {
  // Add redirects to Netlify's redirect file via gatsby-plugin-netlify
  const redirects = await asyncGetContentfulRedirects(graphql, reporter);

  if (!redirects) console.log('Error gathering redirects. Skipping redirect creation.');
  else if (redirects.length === 0) console.log('No redirects found.');
  else if (redirects.length > 0) {
    console.log(`Creating ${redirects?.length} redirects...`);
    createRedirectsFromList(actions, redirects);
    console.log(`Redirects complete.`);
  }
}

const createAssetRedirects = async (graphql, actions, reporter) => {
  // Add links to uploaded assets / files
  // Add redirects to Netlify's redirect file via gatsby-plugin-netlify
  const fileLinks = await asyncGetContentfulFileLink(graphql, reporter);

  if (!fileLinks) console.log('Error gathering file links. Skipping File Link creation.');
  else if (fileLinks.length === 0) console.log('No file links found.');
  else if (fileLinks.length > 0) {
    console.log(`Creating ${fileLinks?.length} file links...`);
    createFileLinksFromList(actions, fileLinks);
    console.log(`File links complete.`);
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  // -----------------------------
  // BLOG POST TEMPLATES & LOADING
  // -----------------------------
  // THP NOTE: SKIPPED. But other "blog posts" are made
  //           as "service" pages below.
  // ------------------------------
  // await createBlogPostPages(graphql, actions, reporter);

  // --------------------------
  // EVENTS TEMPLATES & LOADING
  // --------------------------
  // await createEventPages(graphql, actions, reporter);

  // --------------------------------
  // LANDING PAGE TEMPLATES & LOADING
  // --------------------------------
  await createLandingPages(graphql, actions, reporter);

  // ------------------------------
  // BASIC PAGE TEMPLATES & LOADING
  // ------------------------------
  await createBasicPages(graphql, actions, reporter);
  
  // --------------------------------
  // SERVICE PAGE TEMPLATES & LOADING
  // --------------------------------
  // THP NOTE: Specific to THP. Create "service" pages
  //           from blog posts tagged "service".
  // ------------------------------
  await createServicePages(graphql, actions, reporter);

  // --------------------------
  // REDIRECTS ADDED TO NETLIFY
  // --------------------------
  await createNetlifyRedirects(graphql, actions, reporter);

  // ----------------------------------------------
  // REDIRECTS TO SPECIFIED ASSETS ADDED TO NETLIFY
  // ----------------------------------------------
  await createAssetRedirects(graphql, actions, reporter);
}
