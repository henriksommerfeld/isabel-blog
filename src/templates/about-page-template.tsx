import React from 'react';
import { WindowLocation } from '@reach/router';
import styled from 'styled-components';
import BackgroundImage from 'gatsby-background-image';
import { PageStyled } from '../components/PageStyled';
import { PostContainer } from '../components/PostContainer';
import { useStaticQuery, graphql } from 'gatsby';
import { colors, breakpoints, layout } from '../constants';
import { getFluid } from '../images';
import { SharedIntroBanner } from './shared-intro-banner';
import { FluidObject, GatsbyImageProps } from 'gatsby-image';
import { PostStyled } from '../components/PostStyled';
import PreviewCompatibleImage, {
  ImageProps,
} from '../components/PreviewCompatibleImage';
import { tailwindColors } from '../tailwind-colors';

interface AboutPageTemplateProps {
  title: string;
  content: any;
  contentComponent: any;
  backgroundImageFile: FluidObject | undefined;
  portraitImageFile: ImageProps;
  location: WindowLocation;
  isPreview?: boolean;
}

export function AboutPageTemplate({
  title,
  content,
  contentComponent,
  backgroundImageFile,
  portraitImageFile,
  location,
  isPreview = false,
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
              <PreviewCompatibleImage
                image={portraitImageFile}
                style={portraitStyles}
              />
            </PortraitWrapper>
            <PageContent content={content} />
          </AboutPageContent>
        </PostStyled>
      </PostContainer>
    </PageStyled>
  );
}

const PortraitWrapper = styled('div')`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const portraitStyles = {
  borderRadius: '50%',
  border: '0.5em solid white',
  boxShadow: `0 1px 5px ${tailwindColors.gray600}`,
  width: '300px',
  margin: '0 0 2rem 0',
};

const AboutPageContent = styled('div')``;
