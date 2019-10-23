import React from 'react';
import Image, { GatsbyImageProps } from 'gatsby-image';
import { isImageUrl, getFluid } from '../images';

export interface FancyImage {
  childImageSharp: GatsbyImageProps;
}

export type BlogImage = FancyImage | string;

export interface PreviewCompatibleImageProps {
  image: BlogImage;
  style?: any;
  imgStyle?: any;
  altText?: string;
}

export default function PreviewCompatibleImage({
  image,
  style = null,
  imgStyle = null,
  altText = '',
}: PreviewCompatibleImageProps) {
  if (isImageUrl(image)) {
    const imageUrl = (image as unknown) as string;
    return <img src={imageUrl} alt={altText} style={style} />;
  }

  const fluidImage = getFluid(image);
  if (fluidImage) {
    return (
      <Image
        fluid={fluidImage}
        alt={altText}
        style={style}
        imgStyle={imgStyle}
      />
    );
  }

  return null;
}
