import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import { HTMLContent } from '../components/Content';
import BlogPostTemplate from './blog-post-template';
import useSiteMetadata from '../components/SiteMetadata';
import { editBlogUrlFromAbsolutePath } from '../url-replacer';

export default function BlogPost({ data, ...props }) {
  const { markdownRemark: post } = data;
  const frontmatter = post.frontmatter;
  const tags: string[] = (frontmatter.tags || []) as string[];
  const { title: siteTitle } = useSiteMetadata();

  return (
    <Layout
      location={props.location}
      editLink={editBlogUrlFromAbsolutePath(post.fileAbsolutePath)}
    >
      <BlogPostTemplate
        location={props.location}
        content={post.html}
        contentComponent={HTMLContent}
        date={frontmatter.date}
        helmet={
          <Helmet titleTemplate={`%s | ${siteTitle}`}>
            <html lang={frontmatter.language} />
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
      fileAbsolutePath
      frontmatter {
        date(formatString: "DD MMMM, YYYY", locale: "sv")
        title
        tags
        language
      }
    }
  }
`;
