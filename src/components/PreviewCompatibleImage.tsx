import React from 'react';
import Image, { FluidObject, GatsbyImageProps } from 'gatsby-image';
import { isImageUrl, getFluid } from '../images';

export interface ImageInfoProps {
  alt?: string;
  image: GatsbyImageProps | string | undefined;
}

export interface PreviewCompatibleImageProps {
  imageInfo: ImageInfoProps;
  style?: any;
  imgStyle?: any;
}

export default function PreviewCompatibleImage({
  imageInfo,
  style = null,
  imgStyle = null,
}: PreviewCompatibleImageProps) {
  const { alt = '', image } = imageInfo;

  if (isImageUrl(image)) {
    const imageUrl = image as string;
    return <img src={imageUrl} alt={alt} style={style} />;
  }

  const fluidImage = getFluid(image);
  if (fluidImage) {
    return (
      <Image fluid={fluidImage} alt={alt} style={style} imgStyle={imgStyle} />
    );
  }

  return null;
}
