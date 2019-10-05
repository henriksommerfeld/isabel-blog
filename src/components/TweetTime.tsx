import React from 'react';
import styled from 'styled-components';
import { TweetData } from './Tweets';
import { parseTwitterTime, formatTime } from '../time';
import { isRetweet } from './Tweet';
import { urls } from '../constants';

interface TwitterTimeProps {
  tweet: TweetData;
}

export function TwitterTime({ tweet }: TwitterTimeProps) {
  const time = isRetweet(tweet)
    ? tweet.retweeted_status.created_at
    : tweet.created_at;
  const timestamp = parseTwitterTime(time);
  const dateAndTime = formatTime(timestamp);
  const permalink = GetPermaLink(tweet);

  return (
    <TimeStyled href={permalink} target="_blank">
      {dateAndTime}
    </TimeStyled>
  );
}

function GetPermaLink(tweet: TweetData): string {
  return `${urls.twitterBaseUrl}/${tweet.user.screen_name}/status/${tweet.id_str}`;
}

const TimeStyled = styled('a')`
  font-size: 0.9em;
`;
