import React from 'react';
import styled from 'styled-components';
import Ripples from 'react-ripples';
import { colors, spacing, breakpoints } from '../constants';
import { tailwindColors } from '../tailwind-colors';
import ArrowsDownSvg from '../../static/img/arrows-down.svg';

export default function MorePostsButton({ clickedHandler }) {
  return (
    <ButtonContainer>
      <Ripples className="button">
        <MorePostsButtonStyled onClick={clickedHandler}>
          <ArrowsDown src={ArrowsDownSvg} />
          <ButtonText>Visa äldre inlägg</ButtonText>
          <ArrowsDown src={ArrowsDownSvg} />
        </MorePostsButtonStyled>
      </Ripples>
    </ButtonContainer>
  );
}

const ArrowsDown = styled('img')`
  width: 1em;
  height: auto;
  margin-bottom: 0;
`;

const ButtonText = styled('span')`
  margin: 0 0.5em;
`;

const MorePostsButtonStyled = styled('button')`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  width: 100%;
  background-color: ${tailwindColors.red600};
  transition: background-color 100ms ease-in-out;
  color: ${colors.white};
  border-style: none;
  cursor: pointer;

  &:hover {
    background-color: ${tailwindColors.red700};
  }
  &:active {
    background-color: ${tailwindColors.red800};
  }
`;

const ButtonContainer = styled('div')`
  width: 100%;
  padding: ${spacing.paddingDefault};

  @media (min-width: ${breakpoints.small}) {
    display: flex;
    justify-content: flex-end;
  }
`;
