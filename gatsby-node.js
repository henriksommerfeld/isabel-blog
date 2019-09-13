const _ = require('lodash');
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const { fmImagesToRelative } = require('gatsby-remark-relative-images');
const { getUniqueTags } = require('./src/tags-parser');
const { removeBlogFromUrl } = require('./src/url-replacer');

function getFileFrom(templateKey) {
  if (templateKey === 'blog-post') return 'blog-post.tsx';
  if (templateKey === 'about-page') return 'about-page.tsx';
  if (templateKey === 'index-page') return 'index-page.tsx';
  return templateKey + '.js';
}

exports.onCreateDevServer = ({ app }) => {
  const fsMiddlewareAPI = require('netlify-cms-backend-fs/dist/fs');
  fsMiddlewareAPI(app);
};

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allMarkdownRemark(
        limit: 1000
        filter: { frontmatter: { hidden: { ne: true } } }
      ) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              tags
              templateKey
              url
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    const posts = result.data.allMarkdownRemark.edges;

    posts.forEach(edge => {
      const id = edge.node.id;
      createPage({
        path: edge.node.fields.slug,
        tags: edge.node.frontmatter.tags,
        component: path.resolve(
          `src/templates/${getFileFrom(
            String(edge.node.frontmatter.templateKey)
          )}`
        ),
        // additional data can be passed via context
        context: {
          id,
        },
      });
    });

    // Tag pages:
    let tags = [];
    // Iterate through each post, putting all found tags into `tags`
    posts.forEach(edge => {
      if (_.get(edge, `node.frontmatter.tags`)) {
        tags = tags.concat(edge.node.frontmatter.tags);
      }
    });

    // Eliminate duplicate tags
    const uniqueTags = getUniqueTags(tags);

    // Make tag pages
    uniqueTags.forEach(tag => {
      const tagPath = `/taggar/${_.kebabCase(tag)}/`;

      createPage({
        path: tagPath,
        component: path.resolve(`src/templates/taggar.tsx`),
        context: {
          tag,
        },
      });
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  fmImagesToRelative(node); // convert image paths for gatsby images

  if (node.internal.type === `MarkdownRemark`) {
    const filePath = node.frontmatter.url || createFilePath({ node, getNode });
    const route = removeBlogFromUrl(filePath);
    createNodeField({
      name: `slug`,
      node,
      value: route,
    });
  }
};
