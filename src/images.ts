import { FluidObject } from 'gatsby-image';

export function getFluid(image: any): FluidObject | null {
  if (
    !image ||
    !image.childImageSharp ||
    !image.childImageSharp ||
    !image.childImageSharp.fluid
  ) {
    return null;
  }

  return image.childImageSharp.fluid;
}

export function isImageUrl(image: any): boolean {
  return typeof image === 'string' && image.length > 0;
}

export function isPortrait(image: any): boolean {
  const fluidImage = getFluid(image);

  if (!fluidImage) return false;

  return fluidImage.aspectRatio < 1;
}
