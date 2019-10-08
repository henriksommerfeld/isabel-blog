import React from 'react';
import styled from 'styled-components';
import { TweetData } from './Tweets';
import { isRetweet } from './Tweet';
import { spacing, colors } from '../constants';

interface TweeterProps {
  tweet: TweetData;
}

export function Tweeter({ tweet }: TweeterProps) {
  const user = isRetweet(tweet) ? tweet.retweeted_status.user : tweet.user;

  return (
    <TweeterStyled
      href={GetProfileUrl(user.screen_name)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <ProfileImage src={user.profile_image_url_https} alt="" />
      <NameStyled>
        <RealNameStyled>{user.name}</RealNameStyled>
        <UserNameStyled>@{user.screen_name}</UserNameStyled>
      </NameStyled>
    </TweeterStyled>
  );
}

function GetProfileUrl(screenName: string): string {
  return `https://twitter.com/${screenName}`;
}

const TweeterStyled = styled('a')`
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: ${spacing.default};
`;

const ProfileImage = styled('img')`
  border-radius: 50%;
  border: 2px solid ${colors.white};
  margin: 0;
`;

const NameStyled = styled('div')``;

const RealNameStyled = styled('div')``;

const UserNameStyled = styled('div')`
  font-size: 0.8em;
`;
