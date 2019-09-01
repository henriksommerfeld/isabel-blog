export const spacing = {
  paddingDefault: '1rem',
  paddingDouble: '2rem',
};

export const colors = {
  headerBackground: '#3a506b',
  blueMedium: '#3a506b',
  blueDark: '#1c2541',
  blueDarkest: '#0b132b',
  greenMedium: '#5bc0be',
  greenLight: '#6fffe9',
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
