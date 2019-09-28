import { tailwindColors } from './tailwind-colors';
import { css } from 'styled-components';

export const spacing = {
  paddingDefault: '1rem',
  paddingDouble: '2rem',
  paddingX3: '3rem',
  introBannerExtraPadding: '3rem',
  postBannerExtraPadding: '5rem',
  notFoundBannerExtraPadding: '5rem',
  contentOffset: `-3rem`,
  postHeadingOffset: `-1rem`,
  postHeadingOffsetWithSearchbox: `-2rem`,
};

export const zIndexes = {
  searchBox: 1,
  mobileMenu: 2,
  headerNav: 3,
};

export const layout = {
  contentMaxWidth: 1000,
  borderRadius: '0.25rem',
};

export const breakpoints = {
  small: '768px',
  mediumAsNumber: 1024,
  medium: '1024px',
  large: '1400px',
  xl: '2048px',
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
  postDate: tailwindColors.gray500,
  postDateRoll: tailwindColors.gray700,
  buttonBackground: tailwindColors.red600,
  buttonHover: tailwindColors.red700,
  buttonActive: tailwindColors.red800,
  lighterTextForWhiteBackground: tailwindColors.gray700,
  selectionBackground: tailwindColors.red700,
};

export const fonts = {
  headingFamily: `'Domine', 'serif'`,
  bodyFamily: `'Open Sans', 'sans-serif'`,
};

export const navLinks: NavLink[] = [
  { url: '/', title: 'Startsida' },
  { url: '/publicerat', title: 'Publicerat' },
  { url: '/om', title: 'Om mig' },
  { url: '/pressbilder', title: 'Pressbilder' },
];

export const tagsUrl = '/taggar';

export const imageBorderStyle = {
  margin: 0,
  padding: '4px',
  boxShadow: 'rgba(34,25,25,0.4) 0 1px 3px !important',
  backgroundColor: '#fff',
};

export const buttonStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  width: 100%;
  background-color: ${colors.buttonBackground};
  background-size: 0;
  transition: background-color 100ms ease-in-out;
  color: ${colors.white};
  border-style: none;
  cursor: pointer;

  &:visited {
    color: ${colors.white};
  }

  &:hover {
    background-color: ${colors.buttonHover};
    background-size: 0;
    color: ${colors.white};
  }
  &:active,
  &:focus {
    background-color: ${colors.buttonActive};
    background-size: 0;
    color: ${colors.white};
  }
`;

interface NavLink {
  url: string;
  title: string;
}
