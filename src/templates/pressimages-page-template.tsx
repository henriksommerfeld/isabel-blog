import React from 'react';
import styled from 'styled-components';
import {
  colors,
  breakpoints,
  spacing,
  layout,
  imageBorderStyle,
} from '../constants';
import { FluidObject, GatsbyImageProps } from 'gatsby-image';
import { SharedIntroBanner } from './shared-intro-banner';
import { isPortrait, getFluid, getOriginalImage } from '../images';
import PreviewCompatibleImage, {
  ImageProps,
} from '../components/PreviewCompatibleImage';
import DownloadButton from '../components/DownloadButton';

interface PressImagesTemplate {
  contentComponent: any;
  content: any;
  title: string;
  headerImageFile: FluidObject | undefined;
  pressImages: ImageProps[] | undefined;
}

export function PressImagesPageTemplate({
  contentComponent,
  content,
  title,
  headerImageFile,
  pressImages = [],
}: PressImagesTemplate) {
  const PageContent = contentComponent;

  return (
    <PageStyled>
      <SharedIntroBanner title={title} backgroundImage={headerImageFile} />
      <PostContainer>
        <PostStyled>
          <PageContent content={content} />
          <PressImagesList pressImages={pressImages} />
        </PostStyled>
      </PostContainer>
    </PageStyled>
  );
}

interface PressImagesListProps {
  pressImages: ImageProps[];
}

function PressImagesList({ pressImages }: PressImagesListProps) {
  if (pressImages.length < 1) return null;

  return (
    <DownloadableImages images={pressImages}>
      {pressImages.map((pressImage, index) => {
        const isTallerThanWide = isPortrait(pressImage);
        const originalImage = getOriginalImage(pressImage);
        const suggestedFileName = `isabel-sommerfeld-${originalImage.name}`;

        if (!originalImage.src) return null;

        return (
          <DownloadableImage portrait={isTallerThanWide}>
            <ImageBorder className="featured-thumbnail">
              <PreviewCompatibleImage key={index} image={pressImage} />
            </ImageBorder>
            <ImageMetadata>
              {originalImage.width} x {originalImage.height} px
            </ImageMetadata>
            <DownloadButton
              url={originalImage.src}
              downloadedFilename={suggestedFileName}
            >
              Ladda ner
            </DownloadButton>
          </DownloadableImage>
        );
      })}
    </DownloadableImages>
  );
}

const ImageMetadata = styled('span')`
  font-style: italic;
  font-size: 0.9em;
  padding-top: 0.5em;
  color: ${colors.lighterTextForWhiteBackground};
`;

const ImageBorder = styled('div')`
  width: 100%;
`;

const DownloadableImages = styled('div')`
  display: grid;
  grid-template-columns: ${({ images }) => GetGridColumns(images, 1)};
  grid-gap: ${spacing.paddingDefault};
  grid-auto-flow: row dense;

  @media (min-width: ${breakpoints.small}) {
    grid-gap: ${spacing.paddingDouble};
  }

  @media (min-width: ${breakpoints.medium}) {
    grid-template-columns: ${({ images }) => GetGridColumns(images, 2)};
    grid-gap: ${spacing.paddingX3};
  }
`;

const DownloadableImage = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  grid-column: ${({ portrait }) => (portrait ? 'span 1' : 'span 2')};
`;

function GetGridColumns(images: ImageProps[], breakpoint: number): string {
  if (breakpoint < 2 || images.length < 1) return `repeat(2, 1fr)`;

  const totalWidth = GetImagesWidth(images);
  const columns = totalWidth < 2 ? 2 : totalWidth > 4 ? 4 : totalWidth;

  return `repeat(${columns}, 1fr)`;
}

function GetImagesWidth(images: ImageProps[]): number {
  return images.reduce(
    (count, currentImage) => count + GetImageWidth(currentImage),
    0
  );
}

function GetImageWidth(image: ImageProps): number {
  return isPortrait(image) ? 1 : 2;
}

const PageStyled = styled('div')`
  width: 100%;

  .gatsby-resp-image-figcaption {
    text-align: center;
    font-style: italic;
    padding-top: 0.5rem;
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
