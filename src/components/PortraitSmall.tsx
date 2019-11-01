import React from 'react';
import Image from 'gatsby-image';
import { getFluid } from '../images';

export default function PortraitSmall({ image }) {
  const fluid = getFluid(image);

  if (!fluid) return null;

  return <Image fluid={image.childImageSharp.fluid} style={ImageStyle} />;
}

const ImageStyle = {
  border: '2px solid white',
  boxShadow: '0 1px 5px rgba(0, 0, 0, 0.5)',
  borderRadius: '100%',
  width: '50px',
  height: 'auto',
  margin: '0 1rem 0 0',
};
