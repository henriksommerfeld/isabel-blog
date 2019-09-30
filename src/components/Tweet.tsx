import React from 'react';
import styled from 'styled-components';
import { tailwindColors } from '../tailwind-colors';
import { TweetData } from './Tweets';
import { transparentizeHex } from '../color-convertions';
import { colors, spacing, layout } from '../constants';
import TwitterSvg from '../img/social/twitter.svg';

interface TweetProps {
  tweet: TweetData;
}

export default function Tweet({ tweet }: TweetProps) {
  return (
    <TweetStyled key={tweet.id}>
      {/* <TweeterStyled image={tweet.user.profile_image_url_https} /> */}
      <TwitterLogoStyled />
      <div>{tweet.full_text}</div>
    </TweetStyled>
  );
}

const TweetStyled = styled('div')`
  background-color: ${transparentizeHex(tailwindColors.gray900, 0.3)};
  padding: ${spacing.paddingDefault};
  border-radius: ${layout.borderRadius};
  color: ${colors.white};
`;

const TweeterStyled = styled('div')`
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: -2rem;
    left: -1.5em;
    width: 3rem;
    height: 3rem;
    background-image: url(${props => props.image});
    background-size: contain;
    border-radius: 50%;
    padding: 0.2rem;
  }
`;

const TwitterLogoStyled = styled('div')`
  position: relative;

  &::after {
    content: url(${TwitterSvg});
    position: absolute;
    top: -1.7rem;
    right: -1.5em;
    width: 2rem;
    /* height: 2rem;
    background-color: white;
    border-radius: 50%;
    padding: 0.2rem; */
  }
`;
