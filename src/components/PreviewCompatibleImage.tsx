import React from 'react';
import Img from 'gatsby-image';
import { Jsx } from '../../my-graphql';
import { File } from '../../auto-generated/graphql';

export default function PreviewCompatibleImage({
  image,
  alt,
}: PreviewCompatibleImage): Jsx {
  const imageStyle = { borderRadius: '5px' };

  if (!!image && !!image.childImageSharp && image.childImageSharp.fluid) {
    return (
      <Img style={imageStyle} fluid={image.childImageSharp.fluid} alt={alt} />
    );
  }

  return null;
}

interface PreviewCompatibleImage {
  image: File;
  alt: string;
}
