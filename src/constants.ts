import { tailwindColors } from './tailwind-colors';

export const spacing = {
  paddingDefault: '1rem',
  paddingDouble: '2rem',
};

export const breakpoints = {
  medium: '1000px',
};

export const colors = {
  white: tailwindColors.white,
  black: tailwindColors.black,
  headerBackground: tailwindColors.gray800,
  link: tailwindColors.red600,
  linkVisited: tailwindColors.red500,
  linkFocus: tailwindColors.red700,
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
