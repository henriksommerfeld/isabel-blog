import React, { ReactElement, useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import {
  MarkdownRemarkConnection,
  MarkdownRemarkEdge,
} from '../../auto-generated/graphql';
import BlogRollItem from './BlogRollItem';
import { colors, spacing, breakpoints } from '../constants';
import Ripples from 'react-ripples';
import { tailwindColors } from '../tailwind-colors';

interface BlogRoll {
  allMarkdownRemark: MarkdownRemarkConnection;
}

export default function BlogRoll(): ReactElement {
  const postsPerPage = 5;
  const data = useStaticQuery<BlogRoll>(blogRollQuery);
  const { edges: posts } = data && data.allMarkdownRemark;
  const [postsShown, setPostsShown] = useState(postsPerPage);

  if (!posts) return null;

  function getPostsToShow(): MarkdownRemarkEdge[] {
    return posts.slice(0, postsShown);
  }

  function loadMorePostsClicked() {
    setTimeout(() => {
      setPostsShown(x => x + postsPerPage);
    }, 150);
  }

  return (
    <BlogRollStyled className="blog-roll">
      {getPostsToShow().map(({ node: post }) => BlogRollItem(post))}

      {posts.length > postsShown ? (
        <ButtonContainer>
          <Ripples className="button">
            <MorePostsButton onClick={loadMorePostsClicked}>
              Visa äldre inlägg
            </MorePostsButton>
          </Ripples>
        </ButtonContainer>
      ) : null}
    </BlogRollStyled>
  );
}

const MorePostsButton = styled('button')`
  padding: 0.5rem 1rem;
  width: 100%;
  background-color: ${tailwindColors.red600};
  transition: background-color 100ms ease-in-out;
  color: ${colors.white};
  border-style: none;
  cursor: pointer;

  &:hover {
    background-color: ${tailwindColors.red700};
  }
  &:active {
    background-color: ${tailwindColors.red800};
  }
`;

const ButtonContainer = styled('div')`
  width: 100%;
  padding: ${spacing.paddingDefault};

  @media (min-width: ${breakpoints.small}) {
    display: flex;
    justify-content: flex-end;
  }
`;

const BlogRollStyled = styled('div')`
  background-color: ${colors.white};

  .button {
    width: 100%;
    border-radius: 0.25rem;
    box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 2px;

    @media (min-width: ${breakpoints.small}) {
      width: auto;
    }
  }

  @media (min-width: ${breakpoints.medium}) {
    transform: translateY(${spacing.contentOffset});
    border-radius: 0.25rem;
    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.3);
    padding: ${spacing.paddingDouble};
  }
`;

const blogRollQuery = graphql`
  query BlogRollQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: {
        frontmatter: { templateKey: { eq: "blog-post" }, hidden: { ne: true } }
      }
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
                fluid(maxWidth: 1000, quality: 80) {
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
