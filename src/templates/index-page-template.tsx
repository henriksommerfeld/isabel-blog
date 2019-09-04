import React from 'react';
import styled from 'styled-components';
import { colors } from '../constants';
import BlogRoll from '../components/BlogRoll';
import Content, { HTMLContent } from '../components/Content';
import PreviewCompatibleImage from '../components/PreviewCompatibleImage';

export const IndexPageTemplate = ({
  image,
  heading,
  subheading,
  description,
  isPreview = false,
}) => (
  <div>
    <IntroBanner>
      <PortraitLarge imageInfo={image} style={portraitStyles} />

      <IntroText>
        <h1>{heading}</h1>
        <h2>{subheading}</h2>
        {isPreview ? (
          <Content content={description} />
        ) : (
          <HTMLContent content={description} />
        )}
      </IntroText>
    </IntroBanner>
    <BlogRollContainer>{isPreview ? null : <BlogRoll />}</BlogRollContainer>
  </div>
);

const PortraitLarge = styled(PreviewCompatibleImage)`
  border: 0.5em solid white;
  box-shadow: 0 0 1em black;
  border-radius: 100%;
  width: 280px;
  margin: 2rem 0;
`;

const portraitStyles = {
  borderRadius: '100%',
  border: '0.5em solid white',
  width: '280px',
  margin: '2rem 0',
};

const IntroBanner = styled('div')`
  background: ${colors.headerBackground};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const IntroText = styled('div')`
  color: ${colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BlogRollContainer = styled('div')`
  width: '100%';
`;
