import React from 'react';
import { WindowLocation } from '@reach/router';
import styled from 'styled-components';
import { PageStyled } from '../components/PageStyled';
import { PostContainer } from '../components/PostContainer';
import { SharedIntroBanner } from './shared-intro-banner';
import { FluidObject } from 'gatsby-image';
import { PostStyled } from '../components/PostStyled';
import { ImageProps } from '../components/PreviewCompatibleImage';
import { AboutPortrait } from '../components/AboutPortrait';

interface AboutPageTemplateProps {
  title: string;
  content: any;
  contentComponent: any;
  backgroundImageFile: FluidObject | undefined;
  portraitImageFile: ImageProps;
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
              <AboutPortrait image={portraitImageFile} />
            </PortraitWrapper>
            <PageContent content={content} />
          </AboutPageContent>
        </PostStyled>
      </PostContainer>
    </PageStyled>
  );
}

const AboutPageContent = styled('div')``;

const PortraitWrapper = styled('div')`
  display: flex;
  justify-content: center;
`;
