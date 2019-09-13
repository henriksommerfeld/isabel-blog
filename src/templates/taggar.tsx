import React from 'react';
import Helmet from 'react-helmet';
import { Link, graphql } from 'gatsby';
import Layout from '../components/Layout';
import { TagPageQuery } from '../../auto-generated/graphql';
import useSiteMetadata from '../components/SiteMetadata';
import { TagsTemplate } from './tags-template';

export default function TagRoute({
  data,
  pageContext,
  location,
}: TagRouteProps) {
  const { title } = useSiteMetadata();
  const posts = data.allMarkdownRemark.edges;
  const postLinks = posts.map(post => (
    <li key={post.node.fields.slug}>
      <Link to={post.node.fields.slug}>{post.node.frontmatter.title}</Link>
    </li>
  ));
  const tag = pageContext.tag;
  const totalCount = data.allMarkdownRemark.totalCount;
  const tagHeader = `${totalCount} inlägg tagg${
    totalCount === 1 ? 'at' : 'ade'
  } med “${tag}”`;

  return (
    <Layout location={location} editLink="">
      <Helmet title={`${tag} | ${title}`} />

      <TagsTemplate>
        <h1>{tag}</h1>
        <p>{tagHeader}</p>
        <ul>{postLinks}</ul>
        <br />
        <p>
          <Link to="/taggar/">Se alla taggar</Link>
        </p>
      </TagsTemplate>
    </Layout>
  );
}

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;

interface TagRouteProps {
  data: TagPageQuery;
  pageContext: {
    tag: string;
  };
  location: any;
}
