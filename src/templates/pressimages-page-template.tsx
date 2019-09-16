import React from 'react';
import styled from 'styled-components';
import { colors, breakpoints, spacing, layout } from '../constants';
import BackgroundImage from 'gatsby-background-image';
import { FluidObject } from 'gatsby-image';
import { getFluid, isImageUrl } from '../images';

interface PressImagesTemplate {
  contentComponent: any;
  content: any;
  title: string;
  image: FluidObject | undefined;
}

export function PressImagesPageTemplate({
  contentComponent,
  content,
  title,
  image,
}: PressImagesTemplate) {
  const PageContent = contentComponent;

  return (
    <PageStyled>
      <IntroBanner backgroundImage={image}>
        <IntroBannerWidthConstrainer>
          <Heading>{title}</Heading>
        </IntroBannerWidthConstrainer>
      </IntroBanner>
      <PostContainer>
        <PostStyled>
          <PageContent content={content} />
        </PostStyled>
      </PostContainer>
    </PageStyled>
  );
}

const PageStyled = styled('div')`
  width: 100%;

  .gatsby-resp-image-figcaption {
    text-align: center;
    font-style: italic;
    padding-top: 0.5rem;
  }
`;

function IntroBanner({ children, backgroundImage }) {
  const fluidImage = getFluid(backgroundImage);
  const isUrl = isImageUrl(backgroundImage);

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

  if (isUrl) {
    return (
      <IntroBannerWithUrlImage image={backgroundImage}>
        <IntroBannerDarkOverlay>{children}</IntroBannerDarkOverlay>
      </IntroBannerWithUrlImage>
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
  background-position-y: 80%;
  height: 20vh;

  @media (min-width: ${breakpoints.large}) {
    background-size: 70vw;
    height: 400px;
  }
`;

const IntroBannerWithUrlImage = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position-x: center;
  background-position-y: center;
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

const PostContainer = styled('div')`
  width: '100%';
  margin: 0 auto;

  @media (min-width: ${breakpoints.medium}) {
    max-width: ${layout.contentMaxWidth}px;
  }
`;

const PostStyled = styled.div`
  padding: ${spacing.paddingDefault};
  background-color: ${colors.white};

  @media (min-width: ${breakpoints.small}) {
    padding: ${spacing.paddingDouble};
  }

  @media (min-width: ${breakpoints.medium}) {
    transform: translateY(${spacing.contentOffset});
    border-radius: 4px;
    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.3);
    padding: ${spacing.paddingX3};
  }
`;
