import React from 'react';
import Image from 'gatsby-image';
export default function PreviewCompatibleImage({ imageInfo, style, imgStyle }) {
  const { alt = '', childImageSharp, image } = imageInfo;
  console.log('TCL: PreviewCompatibleImage -> imageInfo', imageInfo);

  if (!!image && !!image.childImageSharp) {
    return (
      <Image
        fluid={image.childImageSharp.fluid}
        alt={alt}
        style={style}
        imgStyle={imgStyle}
      />
    );
  }

  if (childImageSharp) {
    return (
      <Image
        fluid={childImageSharp.fluid}
        alt={alt}
        style={style}
        imgStyle={imgStyle}
      />
    );
  }

  if (!!image && typeof image === 'string')
    return <img src={image} alt={alt} style={style} />;

  return null;
}
