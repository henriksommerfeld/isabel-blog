import React from 'react';
import styled from 'styled-components';
import { colors, breakpoints, spacing, layout } from '../constants';
import BackgroundImage from 'gatsby-background-image';
import { FluidObject } from 'gatsby-image';
import { getFluid } from '../images';
import { SharedIntroBanner } from './shared-intro-banner';

interface PressImagesTemplate {
  contentComponent: any;
  content: any;
  title: string;
  imageFile: FluidObject | undefined;
}

export function PressImagesPageTemplate({
  contentComponent,
  content,
  title,
  imageFile,
}: PressImagesTemplate) {
  const PageContent = contentComponent;

  return (
    <PageStyled>
      <SharedIntroBanner title={title} backgroundImage={imageFile} />
      <PostContainer>
        <PostStyled>
          <PageContent content={content} />
        </PostStyled>
      </PostContainer>
    </PageStyled>
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
