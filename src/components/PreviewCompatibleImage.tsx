import React from 'react';
import Img from 'gatsby-image';
import { ImageSharp } from '../../auto-generated/graphql';

export default function PreviewCompatibleImage({
  imageInfo,
}: PreviewCompatibleImage) {
  const imageStyle = { borderRadius: '5px' };
  const { alt = '', childImageSharp, image } = imageInfo;

  if (!!image && !!image.childImageSharp) {
    return (
      <Img style={imageStyle} fluid={image.childImageSharp!.fluid} alt={alt} />
    );
  }

  if (childImageSharp) {
    return <Img style={imageStyle} fluid={childImageSharp.fluid} alt={alt} />;
  }

  if (!!image && typeof image === 'string')
    return <img style={imageStyle} src={image} alt={alt} />;

  return null;
}

interface PreviewCompatibleImage {
  imageInfo: {
    alt: string;
    childImageSharp: any;
    image?: any;
    style?: object;
  };
}
