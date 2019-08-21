import React, { ReactElement } from 'react';
import { Link } from 'gatsby';
import styled, { createGlobalStyle } from 'styled-components';

import logo from '../img/logo.svg';
import facebook from '../img/social/facebook.svg';
import instagram from '../img/social/instagram.svg';
import twitter from '../img/social/twitter.svg';
import vimeo from '../img/social/vimeo.svg';

export default function Footer(): ReactElement {
  return <InnerFooter>FOOTER</InnerFooter>;
}

const InnerFooter = styled('footer')`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  border: dashed red 2px;
  border: green dashed 2px;
`;
