import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { spacing, buttonStyles } from '../constants';
import { RipplesButton } from './RipplesButton';
import { ButtonText } from './ButtonText';

interface ShareButtonProps {
  icon: string;
  url: string;
  children: ReactNode;
}

export default function ShareButton({ icon, url, children }: ShareButtonProps) {
  return (
    <RipplesButton>
      <ShareButtonStyled href={url} target="_blank" rel="noopener noreferrer">
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
`;

const Inner = styled('span')`
  display: grid;
  grid-template-columns: 2rem auto;
  width: 210px;
`;
