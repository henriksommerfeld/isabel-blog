import { FluidObject } from 'gatsby-image';
import { get } from 'lodash';

export function getFluid(image: any): FluidObject | null {
  return get(image, 'childImageSharp.fluid') || null;
}

export function isImageUrl(image: any): boolean {
  return typeof image === 'string' && image.length > 0;
}

export function isPortrait(image: any): boolean {
  const aspectRatio = get(image, 'childImageSharp.fluid.aspectRatio');

  return aspectRatio && aspectRatio < 1;
}

export interface OriginalImage {
  src: string;
  width: number;
  height: number;
  name: string;
}

export function getOriginalImage(image: any): OriginalImage {
  const src = get(image, 'childImageSharp.original.src') || '';
  const width = get(image, 'childImageSharp.original.width') || '';
  const height = get(image, 'childImageSharp.original.height') || '';
  const name = get(image, 'childImageSharp.fluid.originalName') || '';

  return { src, width, height, name };
}
