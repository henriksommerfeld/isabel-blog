import React from 'react';
import styled from 'styled-components';
import { tailwindColors } from '../tailwind-colors';
import { TweetData } from './Tweets';
import { transparentizeHex } from '../color-convertions';
import { colors, spacing, layout } from '../constants';
import TwitterSvg from '../img/social/twitter.svg';
import RetweetSvg from '../img/social/retweet.svg';
import { TwitterTime } from './TweetTime';
import { Tweeter } from './Tweeter';

interface TweetProps {
  tweet: TweetData;
}

export default function Tweet({ tweet }: TweetProps) {
  return (
    <TweetStyled key={tweet.id} retweet={isRetweet(tweet)}>
      <TwitterLogoStyled />
      <Heading>
        <Tweeter tweet={tweet} />
        <TwitterTime tweet={tweet} />
      </Heading>
      <TweetContent>
        <TweetText>{getText(tweet)}</TweetText>
        <LinkPreview tweet={tweet} />
      </TweetContent>
      <MetaStyled>
        {getRetweetCount(tweet)} retweets, {getLikesCount(tweet)} likes
      </MetaStyled>
    </TweetStyled>
  );
}

export function isRetweet(tweet: TweetData): boolean {
  return !!tweet.retweeted_status;
}

function hasLinkPreview(tweet: TweetData): boolean {
  return !!tweet.linked_site && !!tweet.linked_site.title;
}

function LinkPreview({ tweet }: TweetProps) {
  if (!hasLinkPreview(tweet)) return null;

  return (
    <LinkPreviewStyled>
      <img src={tweet.linked_site.image} alt="" />
      <div>{tweet.linked_site.title}</div>
      <div>{tweet.linked_site.description}</div>
    </LinkPreviewStyled>
  );
}

const LinkPreviewStyled = styled('div')`
  border-radius: ${layout.borderRadius};
`;

function getText(tweet: TweetData): string {
  return isRetweet(tweet) ? tweet.retweeted_status.full_text : tweet.full_text;
}

function getRetweetCount(tweet: TweetData): number {
  return isRetweet(tweet)
    ? tweet.retweeted_status.retweet_count
    : tweet.retweet_count;
}

function getLikesCount(tweet: TweetData): number {
  return isRetweet(tweet)
    ? tweet.retweeted_status.favorite_count
    : tweet.favorite_count;
}

const Heading = styled('div')`
  display: flex;
  justify-content: space-between;
`;

const TweetContent = styled('div')`
  padding-top: ${spacing.default};
  padding-bottom: ${spacing.default};
`;

const TweetText = styled('div')`
  white-space: pre-wrap;
`;

const TweetStyled = styled('div')`
  display: grid;
  grid-template-rows: 0 auto 1fr auto;
  padding: ${spacing.default};
  border-radius: ${layout.borderRadius};
  color: ${colors.white};
  background-color: ${transparentizeHex(tailwindColors.gray900, 0.7)};
  background-image: ${props => (props.retweet ? `url(${RetweetSvg})` : null)};
  background-repeat: no-repeat;
  background-size: 2.5rem;
  background-position: calc(100% - 1rem) calc(100% - 0.5rem);

  a,
  a:visited,
  a:hover,
  a:focus {
    color: ${colors.white};
    background: none;
  }
`;

const MetaStyled = styled('div')`
  padding-top: ${spacing.default};
  background: linear-gradient(
    to right,
    transparent 0%,
    ${tailwindColors.gray700} 50%,
    transparent 100%
  );
  background-position-x: center;
  background-position-y: top;
  background-repeat: repeat;
  background-size: 100% 2px;
  background-repeat: no-repeat;
`;

const TwitterLogoStyled = styled('div')`
  position: relative;

  &::after {
    content: url(${TwitterSvg});
    position: absolute;
    top: -1.7rem;
    right: -1.5em;
    width: 2rem;
  }
`;
