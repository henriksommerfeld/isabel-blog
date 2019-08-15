export interface Frontmatter {
  title: string;
  templateKey: string;
  image?: File;
  heading?: string;
  subheading?: string;
  description?: string;
  slug?: string;
  date?: date;
  featuredimage?: File | null;
  tags: string[] = [];
  //tags?: Maybe<Maybe<Scalars['String']>[]>;
}

export interface FeaturedImageWithTitle {
  title?: string;
  image: File | null | undefined;
}

export interface ImageInfo {
  alt: string;
  childImageSharp?: ImageSharp;
}

export type ImageSharp = Node & {
  id: id;
  fixed?: ImageSharpFixed;
  resolutions?: ImageSharpResolutions;
  fluid?: ImageSharpFluid;
  sizes?: ImageSharpSizes;
  original?: ImageSharpOriginal;
  resize?: ImageSharpResize;
  parent?: Node;
  children: Node[];
  internal: Internal;
};

export interface ImageSharpResize {
  src?: string;
  tracedSVG?: string;
  width?: int;
  height?: int;
  aspectRatio?: float;
  originalName?: string;
}

export interface ImageSharpResolutions {
  base64?: string;
  tracedSVG?: string;
  aspectRatio?: float;
  width?: float;
  height?: float;
  src?: string;
  srcSet?: string;
  srcWebp?: string;
  srcSetWebp?: string;
  originalName?: string;
}

export interface ImageSharpSizes {
  base64?: string;
  tracedSVG?: string;
  aspectRatio?: float;
  src?: string;
  srcSet?: string;
  srcWebp?: string;
  srcSetWebp?: string;
  sizes?: string;
  originalImg?: string;
  originalName?: string;
  presentationWidth?: int;
  presentationHeight?: int;
}

export interface ImageSharpOriginal {
  width?: float;
  height?: float;
  src?: string;
}

export interface ImageSharpFixed {
  base64?: string;
  tracedSVG?: string;
  aspectRatio?: float;
  width?: float;
  height?: float;
  src?: string;
  srcSet?: string;
  srcWebp?: string;
  srcSetWebp?: string;
  originalName?: string;
}

export interface ImageSharpFluid {
  base64?: string;
  tracedSVG?: string;
  aspectRatio?: string;
  src?: string;
  srcSet?: string;
  srcWebp?: string;
  srcSetWebp?: string;
  sizes?: string;
  originalImg?: string;
  originalName?: string;
  presentationWidth?: int;
  presentationHeight?: int;
}

export type Jsx = ReactElement | null;
