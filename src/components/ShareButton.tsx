import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { buttonStyles } from '../constants';
import { RipplesButton } from './RipplesButton';
import { ButtonText } from './ButtonText';
import { darken } from '../color-convertions';

interface ShareButtonProps {
  icon: string;
  url: string;
  color: string;
  children: ReactNode;
}

export default function ShareButton({
  icon,
  url,
  color,
  children,
}: ShareButtonProps) {
  return (
    <RipplesButton>
      <ShareButtonStyled
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        color={color}
      >
        <Inner>
          <Icon src={icon} alt="" />
          <ButtonText>{children}</ButtonText>
        </Inner>
      </ShareButtonStyled>
    </RipplesButton>
  );
}

const Icon = styled('img')`
  width: 1.4em;
  height: auto;
  margin-bottom: 0;
`;

const ShareButtonStyled = styled('a')`
  ${buttonStyles}
  background-color: ${({ color }) => color};

  &:hover {
    background-color: ${({ color }) => darken(color, 10)};
  }
  &:active,
  &:focus {
    background-color: ${({ color }) => darken(color, 20)};
  }
`;

const Inner = styled('span')`
  display: grid;
  grid-template-columns: 2rem auto;
  width: 210px;
`;
