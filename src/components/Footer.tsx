import React, { ReactElement } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import logo from '../img/logo.svg';
import facebook from '../img/social/facebook.svg';
import instagram from '../img/social/instagram.svg';
import twitter from '../img/social/twitter.svg';
import vimeo from '../img/social/vimeo.svg';
import { spacing, colors, breakpoints } from '../constants';
import { tailwindColors } from '../tailwind-colors';

export default function Footer(): ReactElement {
  return <InnerFooter>FOOTER 🧁</InnerFooter>;
}

const InnerFooter = styled('footer')`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${spacing.paddingDefault};
  background-color: ${colors.footerBackground};
  color: ${tailwindColors.blue100};
  box-shadow: 0 -1px 20px rgba(0, 0, 0, 0.5);
`;
