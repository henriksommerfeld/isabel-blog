import React, { ReactElement } from 'react';
import { Link } from 'gatsby';
import PreviewCompatibleImage from './PreviewCompatibleImage';
import {
  MarkdownRemarkEdge,
  MarkdownRemark,
} from '../../auto-generated/graphql';
import { Jsx } from '../../my-graphql';
import styled from 'styled-components';
import { fonts, colors, spacing, breakpoints } from '../constants';

export default function BlogRollItem(post: MarkdownRemark): Jsx {
  if (!post || !post.frontmatter) return null;

  const frontmatter = post.frontmatter;
  const title = frontmatter.title || '';
  const featuredImage = frontmatter.featuredimage;
  const slug = (post.fields && post.fields.slug) || '';
  const date = post.frontmatter.date;

  return (
    <Article key={post.id}>
      <Header>
        <HeadingLink to={slug}>{title}</HeadingLink>
        <Date>Publicerat {date}</Date>
      </Header>
      <div>
        <p>{post.excerpt}</p>
        <ReadMoreWrapper>
          <ReadMoreLink to={slug}>Läs vidare →</ReadMoreLink>
        </ReadMoreWrapper>
      </div>
      <FeaturedImage title={title} image={featuredImage} />
    </Article>
  );
}

const HeadingLink = styled(Link)`
  &,
  &:visited {
    color: ${colors.black};
    font-family: ${fonts.headingFamily};
    font-size: 1.5rem;
  }
  &:hover,
  &:active,
  &:focus {
    color: ${colors.linkFocus};
  }
`;

const Date = styled('div')`
  text-align: center;
  color: gray;
  font-size: 0.8em;
`;

const Article = styled('article')`
  padding: ${spacing.paddingDefault};
  border-bottom: 1px dashed gray;

  /* @media (min-width: ${breakpoints.medium}) {
    padding: ${spacing.paddingDouble};
  } */
`;

const Header = styled('header')`
  text-align: center;
  margin-bottom: 2rem;
`;

const ReadMoreWrapper = styled('div')`
  display: flex;
  justify-content: flex-end;
`;

const ReadMoreLink = styled(Link)`
  color: orangered;
`;

interface FeaturedImage {
  image: File;
  title: string | null | undefined;
}

function FeaturedImage({ image, title }: FeaturedImage): Jsx {
  if (!image) return null;

  const altText = title ? `featured image thumbnail for post ${title}` : '';

  return (
    <div className="featured-thumbnail">
      {/* <PreviewCompatibleImage image={image} alt={altText} /> */}
    </div>
  );
}
