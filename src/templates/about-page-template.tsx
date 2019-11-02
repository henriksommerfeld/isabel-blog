import React from 'react';
import { WindowLocation } from '@reach/router';
import styled from 'styled-components';
import { PageStyled } from '../components/PageStyled';
import { PostContainer } from '../components/PostContainer';
import { SharedIntroBanner } from './shared-intro-banner';
import { PostStyled } from '../components/PostStyled';
import { RoundPortrait } from '../components/RoundPortrait';
import { spacing, emailAddress, links } from '../constants';
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
            <ContactInfo>
              <h2>Kontakta mig på</h2>
              <div>{emailAddress}</div>
              <div>
                <a href={links.linkedin.url}>{links.linkedin.title}</a>
              </div>
            </ContactInfo>
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

const ContactInfo = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: ${spacing.double};
`;
