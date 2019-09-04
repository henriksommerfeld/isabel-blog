import { tailwindColors } from './tailwind-colors';

export const spacing = {
  paddingDefault: '1rem',
  paddingDouble: '2rem',
  introBannerExtraPadding: '3rem',
  contentOffset: `-3rem`,
};

export const breakpoints = {
  medium: '1024px',
};

export const colors = {
  white: tailwindColors.white,
  black: tailwindColors.black,
  pageBackground: tailwindColors.gray100,
  headerBackground: tailwindColors.gray800,
  mobileMenuIconOpen: tailwindColors.gray400,
  mobileMenuBackgroundHover: tailwindColors.gray200,
  mobileMenuTextHover: tailwindColors.red700,
  link: tailwindColors.red600,
  linkVisited: tailwindColors.red600,
  linkFocus: tailwindColors.red700,
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
];

interface NavLink {
  url: string;
  title: string;
}
