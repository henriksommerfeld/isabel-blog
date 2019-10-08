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
import { spacing } from '../constants';

interface AboutPageTemplateProps {
  title: string;
  content: string;
  contentComponent: any;
  contactInfo: string;
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
            <ContactInfo>
              <h2>Kontakta mig på</h2>
              <div>isabel@sommerfeld.nu</div>
              <div>
                <a href="https://www.linkedin.com/in/isabelsommerfeld">
                  LinkedIn
                </a>
              </div>
            </ContactInfo>
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

const ContactInfo = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: ${spacing.double};
`;
