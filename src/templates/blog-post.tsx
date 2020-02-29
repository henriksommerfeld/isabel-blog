import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import { HTMLContent } from '../components/Content';
import BlogPostTemplate from './blog-post-template';
import { editBlogUrlFromAbsolutePath } from '../url-replacer';
import { getFluid } from '../images';

export default function BlogPost({ data, ...props }) {
  const { markdownRemark: post } = data;
  const frontmatter = post.frontmatter;
  const tags: string[] = (frontmatter.tags || []) as string[];
  const graphImage = getFluid(frontmatter.featuredimage);
  const graphImageUrl = graphImage?.src || null;

  return (
    <Layout
      location={props.location}
      pageTitle={frontmatter.title}
      pageDescription={frontmatter.description}
      openGraphImage={graphImageUrl}
      editLink={editBlogUrlFromAbsolutePath(post.fileAbsolutePath)}
    >
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        date={frontmatter.date}
        tags={tags}
        title={frontmatter.title}
        location={props.location}
      />
    </Layout>
  );
}

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      fileAbsolutePath
      frontmatter {
        date(formatString: "DD MMMM, YYYY", locale: "sv")
        title
        tags
        language
        description
        featuredimage {
          childImageSharp {
            fluid(maxWidth: 1200) {
              src
            }
          }
        }
      }
    }
  }
`;
