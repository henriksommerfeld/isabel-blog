import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import { HTMLContent } from '../components/Content';
import BlogPostTemplate from './blog-post-template';
import useSiteMetadata from '../components/SiteMetadata';

export default function BlogPost({ data, ...props }) {
  const { markdownRemark: post } = data;
  const frontmatter = post.frontmatter;
  const tags: string[] = (frontmatter.tags || []) as string[];
  const { title: siteTitle } = useSiteMetadata();

  return (
    <Layout location={props.location}>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        date={frontmatter.date}
        helmet={
          <Helmet titleTemplate={`%s | ${siteTitle}`}>
            <title>{`${frontmatter.title}`}</title>
            <meta name="description" content={`${frontmatter.description}`} />
          </Helmet>
        }
        tags={tags}
        title={frontmatter.title}
      />
    </Layout>
  );
}

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "DD MMMM, YYYY", locale: "sv")
        title
        tags
      }
    }
  }
`;
