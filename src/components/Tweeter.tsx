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
    <TweeterStyled href={user.url} target="_blank">
      <ProfileImage src={user.profile_image_url_https} alt="" />
      <NameStyled>
        <RealNameStyled>{user.name}</RealNameStyled>
        <UserNameStyled>@{user.screen_name}</UserNameStyled>
      </NameStyled>
    </TweeterStyled>
  );
}

const TweeterStyled = styled('a')`
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: ${spacing.paddingDefault};
`;

const ProfileImage = styled('img')`
  border-radius: 50%;
  border: 2px solid ${colors.white};
`;

const NameStyled = styled('div')``;

const RealNameStyled = styled('div')``;

const UserNameStyled = styled('div')`
  font-size: 0.8em;
`;
