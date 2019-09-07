import React from 'react';
import { spacing, colors } from '../constants';
import styled from 'styled-components';
import portrait from '../../static/uploads/isabel_960x960.jpg';

export default function PortraitSmall() {
  return <Image src={portrait} />;
}

const Image = styled('img')`
  border: 2px solid white;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.5);
  border-radius: 100%;
  max-width: 50px;
  max-height: 50px;
  margin: 0 1rem 0 0;
`;
