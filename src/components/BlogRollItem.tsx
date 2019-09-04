import React, { ReactElement } from 'react';
import { Link } from 'gatsby';
import PreviewCompatibleImage from './PreviewCompatibleImage';
import {
  MarkdownRemarkEdge,
  MarkdownRemark,
} from '../../auto-generated/graphql';
import { Jsx } from '../../my-graphql';
import styled from 'styled-components';

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
    display: block;
    text-align: center;
    color: black;
    font-family: 'Domine';
    font-size: 1.5rem;
  }
`;

const Date = styled('div')`
  text-align: center;
  color: gray;
  font-size: 0.8em;
`;

const Article = styled('article')`
  padding: 15px;
  border-bottom: 1px dashed gray;
`;

const Header = styled('header')`
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
