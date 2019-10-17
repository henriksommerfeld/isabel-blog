import React from 'react';
import styled from 'styled-components';
import { colors, breakpoints, spacing, layout } from '../constants';
import BackgroundImage from 'gatsby-background-image';
import { FluidObject } from 'gatsby-image';
import { getFluid } from '../images';
import Searchbox from '../components/Searchbox';
import { WindowLocation } from '@reach/router';

interface SharedIntroBannerProps {
  title: string;
  backgroundImage: FluidObject | undefined;
  overlayOpacity?: number;
  location: WindowLocation;
}

export function SharedIntroBanner({
  title,
  backgroundImage,
  overlayOpacity = 0.6,
  location,
}: SharedIntroBannerProps) {
  if (!title) return null;

  return (
    <IntroBanner
      backgroundImage={backgroundImage}
      overlayOpacity={overlayOpacity}
    >
      <Searchbox location={location} />
      <IntroBannerWidthConstrainer>
        <Heading data-testid="page-title">{title}</Heading>
      </IntroBannerWidthConstrainer>
    </IntroBanner>
  );
}

function IntroBanner({ backgroundImage, overlayOpacity, children }) {
  const fluidImage = getFluid(backgroundImage);

  if (!fluidImage) {
    return <IntroBannerSolidBackground>{children}</IntroBannerSolidBackground>;
  }

  return (
    <IntroBannerWithFluidImage
      fluid={fluidImage}
      backgroundColor={colors.black}
    >
      <IntroBannerDarkOverlay opacity={overlayOpacity}>
        {children}
      </IntroBannerDarkOverlay>
    </IntroBannerWithFluidImage>
  );
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
  justify-content: stretch;
  align-items: center;
  background-color: rgba(0, 0, 0, ${({ opacity }) => opacity});
  width: 100%;
  height: 100%;
`;

const bannerMinHeight = '150px';
const bannerMinHeightMedium = '300px';
const IntroBannerWithFluidImage = styled(BackgroundImage)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-position-x: center;
  background-position-y: center;
  min-height: ${bannerMinHeight};

  @media (min-width: ${breakpoints.medium}) {
    min-height: ${bannerMinHeightMedium};
  }
`;

const IntroBannerWidthConstrainer = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: ${bannerMinHeight};
  max-width: ${layout.contentMaxWidth}px;

  @media (min-width: ${breakpoints.medium}) {
    min-height: ${bannerMinHeightMedium};
  }
`;

const Heading = styled('h1')`
  color: ${colors.white};
  line-height: 1.4em;
  word-break: break-word;
  text-align: center;

  @media (min-width: ${breakpoints.medium}) {
    transform: translateY(${spacing.postHeadingOffsetWithSearchbox});
  }
`;
