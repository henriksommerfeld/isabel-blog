import React from 'react';
import styled from 'styled-components';
import { breakpoints, buttonStyles } from '../constants';
import CommentSvg from '../../static/img/comment.svg';
import { RipplesButton } from './RipplesButton';
import { ButtonText } from './ButtonText';
import { tailwindColors } from '../tailwind-colors';

interface CommentsButtonProps {
  clickedHandler: Function;
}

export default function CommentsButton({
  clickedHandler,
}: CommentsButtonProps) {
  return (
    <ButtonContainer>
      <RipplesButtonWithBreakpoints>
        <ButtonStyled onClick={clickedHandler} data-testid="comments-button">
          <Icon src={CommentSvg} />
          <ButtonText>Visa kommentarer</ButtonText>
        </ButtonStyled>
      </RipplesButtonWithBreakpoints>
    </ButtonContainer>
  );
}

const RipplesButtonWithBreakpoints = styled(RipplesButton)`
  @media (min-width: ${breakpoints.small}) {
    width: auto;
  }
`;

const Icon = styled('img')`
  width: 2em;
  height: auto;
  margin-bottom: 0;
`;

const ButtonStyled = styled('button')`
  ${buttonStyles}

  background-color: ${tailwindColors.gray600};

  &:hover {
    background-color: ${tailwindColors.gray700};
  }
  &:active,
  &:focus {
    background-color: ${tailwindColors.gray800};
  }
`;

const ButtonContainer = styled('div')`
  width: 100%;

  @media (min-width: ${breakpoints.small}) {
    display: flex;
    justify-content: center;
  }
`;
