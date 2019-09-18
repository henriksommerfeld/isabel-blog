import React from 'react';
import styled from 'styled-components';
import Ripples from 'react-ripples';
import { colors, spacing, breakpoints, layout } from '../constants';
import DownloadSvg from '../../static/img/download.svg';

export default function DownloadButton({ clickedHandler, children }) {
  return (
    <ButtonContainer>
      <RipplesButton>
        <DownloadButtonStyled onClick={clickedHandler}>
          <ArrowsDown src={DownloadSvg} />
          <ButtonText>{children}</ButtonText>
        </DownloadButtonStyled>
      </RipplesButton>
    </ButtonContainer>
  );
}

const RipplesButton = styled(Ripples)`
  width: 100%;
  border-radius: ${layout.borderRadius};
  box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 2px;
`;

const ArrowsDown = styled('img')`
  width: 1em;
  height: auto;
  margin-bottom: 0;
`;

const ButtonText = styled('span')`
  margin: 0 0.5em;
`;

const DownloadButtonStyled = styled('button')`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  width: 100%;
  background-color: ${colors.buttonBackground};
  transition: background-color 100ms ease-in-out;
  color: ${colors.white};
  border-style: none;
  cursor: pointer;

  &:hover {
    background-color: ${colors.buttonHover};
  }
  &:active {
    background-color: ${colors.buttonActive};
  }
`;

const ButtonContainer = styled('div')`
  width: 100%;
  padding: ${spacing.paddingDefault} 0 0 0;
`;
