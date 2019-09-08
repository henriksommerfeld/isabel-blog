import React, { ReactElement } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import { MarkdownRemarkConnection } from '../../auto-generated/graphql';
import BlogRollItem from './BlogRollItem';
import { colors, spacing, breakpoints } from '../constants';

interface BlogRoll {
  allMarkdownRemark: MarkdownRemarkConnection;
}

export default function BlogRoll(): ReactElement {
  const data = useStaticQuery<BlogRoll>(blogRollQuery);
  const { edges: posts } = data && data.allMarkdownRemark;

  if (!posts) return null;

  return (
    <BlogRollStyled className="blog-roll">
      {posts.map(({ node: post }) => BlogRollItem(post))}
    </BlogRollStyled>
  );
}

const BlogRollStyled = styled('div')`
  background-color: ${colors.white};

  @media (min-width: ${breakpoints.medium}) {
    transform: translateY(${spacing.contentOffset});
    border-radius: 4px;
    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.3);
    padding: ${spacing.paddingDouble};
  }
`;

const blogRollQuery = graphql`
  query BlogRollQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "DD MMMM, YYYY", locale: "sv")
            featuredimage {
              childImageSharp {
                fluid(maxWidth: 1000, quality: 100) {
                  src
                  srcSet
                  aspectRatio
                  sizes
                  base64
                }
              }
            }
          }
        }
      }
    }
  }
`;
