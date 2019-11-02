import React from 'react';
import styled from 'styled-components';
import { colors, breakpoints, spacing, layout } from '../constants';
import { GatsbyImageProps } from 'gatsby-image';
import { SharedIntroBanner } from './shared-intro-banner';
import { isPortrait, getOriginalImage } from '../images';
import PreviewCompatibleImage, {
  FancyImage,
} from '../components/PreviewCompatibleImage';
import DownloadButton from '../components/DownloadButton';
import { WindowLocation } from '@reach/router';
import { PageStyled } from '../components/PageStyled';

interface PressImagesTemplate {
  contentComponent: any;
  content: any;
  title: string;
  headerImageFile: FancyImage;
  pressImages: FancyImage[] | undefined;
  isPreview?: boolean;
  location: WindowLocation;
}

export function PressImagesPageTemplate({
  contentComponent,
  content,
  title,
  headerImageFile,
  pressImages = [],
  isPreview = false,
  location,
}: PressImagesTemplate) {
  const PageContent = contentComponent;

  return (
    <PageStyled>
      <SharedIntroBanner
        title={title}
        backgroundImage={headerImageFile}
        location={location}
      />
      <PostContainer>
        <PostStyled>
          <PageContent content={content} />
          <PressImagesList pressImages={pressImages} isPreview={isPreview} />
        </PostStyled>
      </PostContainer>
    </PageStyled>
  );
}

interface PressImagesListProps {
  pressImages: FancyImage[];
  isPreview?: boolean;
}

function PressImagesList({ pressImages, isPreview }: PressImagesListProps) {
  if (pressImages.length < 1) return null;

  return (
    <DownloadableImages images={pressImages}>
      {pressImages.map((pressImage, index) => {
        const isTallerThanWide = isPortrait(pressImage);
        const originalImage = getOriginalImage(pressImage);
        const suggestedFileName = `isabel-sommerfeld-${originalImage.name}`;
        const urlToDownload = isPreview
          ? ((pressImage as unknown) as string)
          : originalImage.src;

        if (!originalImage.src && !isPreview) return null;

        return (
          <DownloadableImage portrait={isTallerThanWide} key={index}>
            <ImageBorder className="featured-thumbnail">
              <PreviewCompatibleImage
                key={index}
                image={pressImage}
                altText={`Pressbild ${index + 1}`}
              />
            </ImageBorder>
            <ImageMetadata>
              {originalImage.width} x {originalImage.height} px
            </ImageMetadata>
            <DownloadButton
              url={urlToDownload}
              downloadedFilename={suggestedFileName}
              ariaLabel={`Ladda ner pressbild ${index + 1}`}
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
  grid-gap: ${spacing.default};
  grid-auto-flow: row dense;

  @media (min-width: ${breakpoints.small}) {
    grid-gap: ${spacing.double};
  }

  @media (min-width: ${breakpoints.medium}) {
    grid-template-columns: ${({ images }) => GetGridColumns(images, 2)};
    grid-gap: ${spacing.x3};
  }
`;

const DownloadableImage = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  grid-column: ${({ portrait }) => (portrait ? 'span 1' : 'span 2')};
`;

function GetGridColumns(
  images: GatsbyImageProps[],
  breakpoint: number
): string {
  if (breakpoint < 2 || images.length < 1) return `repeat(2, 1fr)`;

  const totalWidth = GetImagesWidth(images);
  const columns = totalWidth < 2 ? 2 : totalWidth > 4 ? 4 : totalWidth;

  return `repeat(${columns}, 1fr)`;
}

function GetImagesWidth(images: GatsbyImageProps[]): number {
  return images.reduce(
    (count, currentImage) => count + GetImageWidth(currentImage),
    0
  );
}

function GetImageWidth(image: GatsbyImageProps): number {
  return isPortrait(image) ? 1 : 2;
}

const PostContainer = styled('div')`
  width: '100%';
  margin: 0 auto;

  @media (min-width: ${breakpoints.medium}) {
    max-width: ${layout.contentMaxWidth}px;
  }
`;

const PostStyled = styled('main')`
  padding: ${spacing.default};
  background-color: ${colors.white};

  @media (min-width: ${breakpoints.small}) {
    padding: ${spacing.double};
  }

  @media (min-width: ${breakpoints.medium}) {
    transform: translateY(${spacing.contentOffset});
    border-radius: 4px;
    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.3);
    padding: ${spacing.x3};
  }
`;
