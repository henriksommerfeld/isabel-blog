import React from 'react';
import styled from 'styled-components';
import { colors, breakpoints, spacing, layout } from '../constants';
import { SharedIntroBanner } from './shared-intro-banner';
import { WindowLocation } from '@reach/router';
import { PageStyled } from '../components/PageStyled';
import { FancyImage } from 'components/PreviewCompatibleImage';

interface PublishedTemplate {
  contentComponent: any;
  content: any;
  title: string;
  imageFile: FancyImage;
  location: WindowLocation;
}

export function PublishedPageTemplate({
  contentComponent,
  content,
  title,
  imageFile,
  location,
}: PublishedTemplate) {
  const PageContent = contentComponent;

  return (
    <PageStyled>
      <SharedIntroBanner
        title={title}
        backgroundImage={imageFile}
        location={location}
      />
      <PostContainer>
        <PostStyled>
          <PageContent content={content} data-testid="published-text" />
        </PostStyled>
      </PostContainer>
    </PageStyled>
  );
}

const PostContainer = styled('div')`
  width: '100%';
  margin: 0 auto;

  @media (min-width: ${breakpoints.medium}) {
    max-width: ${layout.contentMaxWidth}px;
  }
`;

const PostStyled = styled('main')`
  padding: ${spacing.default};
  background-color: ${colors.white};

  @media (min-width: ${breakpoints.small}) {
    padding: ${spacing.double};
  }

  @media (min-width: ${breakpoints.medium}) {
    transform: translateY(${spacing.contentOffset});
    border-radius: 4px;
    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.3);
    padding: ${spacing.x3};
  }
`;
