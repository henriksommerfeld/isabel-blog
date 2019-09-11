import { tailwindColors } from './tailwind-colors';

export const spacing = {
  paddingDefault: '1rem',
  paddingDouble: '2rem',
  paddingX3: '3rem',
  introBannerExtraPadding: '3rem',
  postBannerExtraPadding: '5rem',
  notFoundBannerExtraPadding: '5rem',
  contentOffset: `-3rem`,
  postHeadingOffset: `-1rem`,
};

export const layout = {
  contentMaxWidth: 1000,
};

export const breakpoints = {
  small: '768px',
  mediumAsNumber: 1024,
  medium: '1024px',
  large: '2048px',
};

export const colors = {
  white: tailwindColors.white,
  black: tailwindColors.black,
  pageBackground: tailwindColors.gray100,
  headerBackground: tailwindColors.gray800,
  footerBackground: tailwindColors.blue900,
  mobileMenuIconOpen: tailwindColors.gray400,
  mobileMenuBackgroundHover: tailwindColors.gray200,
  mobileMenuTextHover: tailwindColors.red700,
  link: tailwindColors.red600,
  linkVisited: tailwindColors.red600,
  linkFocus: tailwindColors.red700,
  postDate: tailwindColors.gray400,
};

export const fonts = {
  headingFamily: `'Domine', 'serif'`,
  bodyFamily: `'Open Sans', 'sans-serif'`,
};

export const navLinks: NavLink[] = [
  { url: '/', title: 'Startsida' },
  { url: '/publicerat', title: 'Publicerat' },
  { url: '/om', title: 'Om mig' },
  { url: '/cv', title: 'CV' },
  { url: '/pressbilder', title: 'Pressbilder' },
  { url: '/sok', title: 'Sök' },
];

interface NavLink {
  url: string;
  title: string;
}
