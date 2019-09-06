import React from 'react';
import { kebabCase } from 'lodash';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import { MarkdownRemark } from '../../auto-generated/graphql';
import styled from 'styled-components';
import BlogPostTemplate from './blog-post-template';
import useSiteMetadata from '../components/SiteMetadata';

interface BlogPost {
  data: {
    markdownRemark: MarkdownRemark;
  };
}

export default function BlogPost(props: BlogPost) {
  const { markdownRemark: post } = props.data;
  const frontmatter = post.frontmatter;
  const tags: string[] = (frontmatter.tags || []) as string[];
  const { title: siteTitle } = useSiteMetadata();

  return (
    <Layout location={props.location}>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={frontmatter.description}
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
        date(formatString: "MMMM DD, YYYY")
        title
        tags
      }
    }
  }
`;
