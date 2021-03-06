import React from 'react';
import styled from 'styled-components';
import { colors, breakpoints, spacing, layout } from '../constants';
import BlogRoll from '../components/BlogRoll';
import Content, { HTMLContent } from '../components/Content';
import Searchbox from '../components/Searchbox';
import { WindowLocation } from '@reach/router';
import { PageStyled } from '../components/PageStyled';
import { RoundPortrait } from '../components/RoundPortrait';
import { tailwindColors } from '../tailwind-colors';

interface IndexPageTemplateProps {
  image: any;
  heading: string;
  subheading: string;
  description: string;
  isPreview?: boolean;
  location: WindowLocation;
}

export const IndexPageTemplate = ({
  image,
  heading,
  subheading,
  description,
  isPreview = false,
  location,
}: IndexPageTemplateProps) => (
  <PageStyled>
    <IntroBanner>
      {!isPreview && <Searchbox location={location} />}
      <IntroBannerWidthConstrainer>
        <RoundPortrait
          image={image}
          additionalStyles={{
            boxShadow: `0 4px 1rem ${tailwindColors.gray900}`,
          }}
        />
        <IntroText>
          <h1>{heading}</h1>
          <h2>{subheading}</h2>
          {isPreview ? (
            <Content content={description} />
          ) : (
            <HTMLContent content={description} />
          )}
        </IntroText>
      </IntroBannerWidthConstrainer>
    </IntroBanner>
    <BlogRollContainer>{isPreview ? null : <BlogRoll />}</BlogRollContainer>
  </PageStyled>
);

const IntroBanner = styled('div')`
  background: ${colors.headerBackground};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const IntroBannerWidthConstrainer = styled('div')`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (min-width: ${breakpoints.medium}) {
    flex-direction: row-reverse;
    justify-content: space-evenly;
    padding-bottom: ${spacing.introBannerExtra};
    max-width: ${layout.contentMaxWidth}px;
  }
`;

const IntroText = styled('div')`
  color: ${colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: ${spacing.default};
  padding-right: ${spacing.default};
  text-align: center;
`;

const BlogRollContainer = styled('div')`
  width: '100%';
  margin: 0 auto;

  @media (min-width: ${breakpoints.medium}) {
    max-width: ${layout.contentMaxWidth}px;
  }
`;
