import React from 'react';
import { WindowLocation } from '@reach/router';
import styled from 'styled-components';
import { PageStyled } from '../components/PageStyled';
import { PostContainer } from '../components/PostContainer';
import { SharedIntroBanner } from './shared-intro-banner';
import { PostStyled } from '../components/PostStyled';
import { RoundPortrait } from '../components/RoundPortrait';
import { BlogImage } from 'components/PreviewCompatibleImage';

interface AboutPageTemplateProps {
  title: string;
  content: string;
  contentComponent: any;
  backgroundImageFile: BlogImage;
  portraitImageFile: BlogImage;
  location: WindowLocation;
}

export function AboutPageTemplate({
  title,
  content,
  contentComponent,
  backgroundImageFile,
  portraitImageFile,
  location,
}: AboutPageTemplateProps) {
  const PageContent = contentComponent;

  return (
    <PageStyled>
      <SharedIntroBanner
        title={title}
        backgroundImage={backgroundImageFile}
        overlayOpacity={0.5}
        location={location}
      />
      <PostContainer>
        <PostStyled>
          <AboutPageContent>
            <PortraitWrapper>
              <RoundPortrait image={portraitImageFile} />
            </PortraitWrapper>
            <PageContent content={content} data-testid="about-me-text" />
          </AboutPageContent>
        </PostStyled>
      </PostContainer>
    </PageStyled>
  );
}

const AboutPageContent = styled('main')``;

const PortraitWrapper = styled('div')`
  display: flex;
  justify-content: center;
`;
