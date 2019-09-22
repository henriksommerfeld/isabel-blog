import React from 'react';
import Content from '../components/Content';
import styled from 'styled-components';
import { colors, spacing, breakpoints, layout } from '../constants';
import BlogPostTags from './blog-post-tags';
import Search from '../components/Search';

interface BlogPostTemplate {
  content: string;
  contentComponent: any;
  date: string;
  tags: string[] | undefined;
  title: string;
  helmet: any;
}

export default function BlogPostTemplate({
  content,
  contentComponent,
  date,
  tags,
  title,
  helmet,
}: BlogPostTemplate) {
  const PostContent = contentComponent || Content;
  const dateString = date ? `Publicerat ${date}` : '';

  return (
    <>
      {helmet || ''}
      <PageStyled>
        <IntroBanner>
          <Search location={location} />
          <IntroBannerWidthConstrainer>
            <Heading>{title}</Heading>
            <PostDate>{dateString}</PostDate>
          </IntroBannerWidthConstrainer>
        </IntroBanner>
        <PostContainer>
          <PostStyled>
            <PostContent content={content} />
            <BlogPostTags tags={tags} />
          </PostStyled>
        </PostContainer>
      </PageStyled>
    </>
  );
}

const PageStyled = styled('div')`
  width: 100%;

  .gatsby-resp-image-figcaption {
    text-align: center;
    font-style: italic;
    padding-top: 0.5rem;
  }
`;

const PostDate = styled.div`
  color: ${colors.postDate};

  @media (min-width: ${breakpoints.medium}) {
    transform: translateY(${spacing.postHeadingOffset});
  }
`;

const IntroBannerWidthConstrainer = styled('div')`
  max-width: ${layout.contentMaxWidth}px;
  text-align: center;
  padding: ${spacing.paddingDouble} ${spacing.paddingDefault};

  @media (min-width: ${breakpoints.medium}) {
    padding: ${spacing.introBannerExtraPadding} ${spacing.paddingDouble}
      ${spacing.postBannerExtraPadding} ${spacing.paddingDouble};
  }
`;

const IntroBanner = styled('div')`
  background: ${colors.headerBackground};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Heading = styled.h1`
  color: ${colors.white};
  line-height: 1.4em;
  word-break: break-word;

  @media (min-width: ${breakpoints.medium}) {
    transform: translateY(${spacing.postHeadingOffset});
  }
`;

const PostContainer = styled('div')`
  width: '100%';
  margin: 0 auto;

  @media (min-width: ${breakpoints.medium}) {
    max-width: ${layout.contentMaxWidth}px;
  }
`;

const PostStyled = styled.div`
  padding: ${spacing.paddingDefault};
  background-color: ${colors.white};

  @media (min-width: ${breakpoints.small}) {
    padding: ${spacing.paddingDouble};
  }

  @media (min-width: ${breakpoints.medium}) {
    transform: translateY(${spacing.contentOffset});
    border-radius: 4px;
    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.3);
    padding: ${spacing.paddingX3};
  }
`;
