import React from 'react';
import Helmet from 'react-helmet';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/Layout';
import { TagPageQuery } from '../../auto-generated/graphql';
import useSiteMetadata from '../components/SiteMetadata';
import { TagsTemplate } from './tags-template';
import tagSvg from '../../static/img/tag-grey500.svg';
import blogPostSvg from '../../static/img/blog-post-grey500.svg';

export default function TagRoute({
  data,
  pageContext,
  location,
}: TagRouteProps) {
  const { title } = useSiteMetadata();
  const posts = data.allMarkdownRemark.edges;
  const postLinks = posts.map(post => (
    <LinkContainer key={post.node.fields.slug}>
      <LinkIconSvg src={blogPostSvg} alt="" />
      <Link to={post.node.fields.slug}>{post.node.frontmatter.title}</Link>
    </LinkContainer>
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
        <SeAllTagsLinkContainer>
          <LinkIconSvg src={tagSvg} alt="" />
          <Link to="/taggar/">Se alla taggar</Link>
        </SeAllTagsLinkContainer>
      </TagsTemplate>
    </Layout>
  );
}

const LinkIconSvg = styled('img')`
  margin: 0 0.5em 0 0;
  min-width: 1rem;
`;

const LinkContainer = styled('li')`
  display: flex;
  align-items: center;
`;

const SeAllTagsLinkContainer = styled('div')`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

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
