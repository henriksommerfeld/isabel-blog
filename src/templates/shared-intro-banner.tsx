import React from 'react';
import styled from 'styled-components';
import { colors, breakpoints, spacing, layout } from '../constants';
import BackgroundImage from 'gatsby-background-image';
import { FluidObject } from 'gatsby-image';
import { getFluid } from '../images';

interface SharedIntroBanner {
  title: string;
  backgroundImage: FluidObject | undefined;
}

export function SharedIntroBanner({
  title,
  backgroundImage,
}: SharedIntroBanner) {
  if (!title) return null;

  return (
    <IntroBanner backgroundImage={backgroundImage}>
      <IntroBannerWidthConstrainer>
        <Heading>{title}</Heading>
      </IntroBannerWidthConstrainer>
    </IntroBanner>
  );
}

function IntroBanner({ backgroundImage, children }) {
  const fluidImage = getFluid(backgroundImage);

  if (fluidImage) {
    return (
      <IntroBannerWithFluidImage
        fluid={fluidImage}
        backgroundColor={colors.black}
      >
        <IntroBannerDarkOverlay>{children}</IntroBannerDarkOverlay>
      </IntroBannerWithFluidImage>
    );
  }

  return <IntroBannerSolidBackground>{children}</IntroBannerSolidBackground>;
}

const IntroBannerSolidBackground = styled('div')`
  background-color: ${colors.headerBackground};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const IntroBannerDarkOverlay = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
`;

const IntroBannerWithFluidImage = styled(BackgroundImage)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-position-x: center;
  background-position-y: center;
  height: 20vh;

  @media (min-width: ${breakpoints.large}) {
    background-size: 70vw;
    height: 400px;
  }
`;

const IntroBannerWidthConstrainer = styled('div')`
  max-width: ${layout.contentMaxWidth}px;
  text-align: center;
  padding: ${spacing.paddingDouble} ${spacing.paddingDefault};

  @media (min-width: ${breakpoints.medium}) {
    padding: ${spacing.postBannerExtraPadding} ${spacing.paddingDouble};
  }
`;

const Heading = styled.h1`
  color: ${colors.white};
  line-height: 1.4em;
  word-break: break-word;

  @media (min-width: ${breakpoints.medium}) {
    transform: translateY(${spacing.postHeadingOffset});
  }
`;
