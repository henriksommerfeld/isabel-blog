import React from 'react';
import styled from 'styled-components';
import { tailwindColors } from '../tailwind-colors';
import { TweetData, TwitterImage } from './Tweets';
import { transparentizeHex } from '../color-convertions';
import { colors, spacing, layout } from '../constants';
import TwitterSvg from '../img/social/twitter.svg';
import RetweetSvg from '../img/social/retweet.svg';
import LinkSvg from '../../static/img/link-twitter.svg';
import { TwitterTime } from './TweetTime';
import { Tweeter } from './Tweeter';

interface TweetProps {
  tweet: TweetData;
  images?: TwitterImage[];
}

export default function Tweet({ tweet, images = [] }: TweetProps) {
  return (
    <TweetStyled key={tweet.id} retweet={isRetweet(tweet)}>
      <TwitterLogoStyled />
      <Heading>
        <Tweeter tweet={tweet} images={images} />
        <TwitterTime tweet={tweet} />
      </Heading>
      <TweetContent>
        <TweetText tweet={tweet} />
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
    <LinkPreviewStyled
      href={tweet.linked_site.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <LinkPreviewImg src={tweet.linked_site.image} alt="" />
      <LinkPreviewText>
        <div>{tweet.linked_site.title}</div>
        <LinkPreviewDescription>
          {tweet.linked_site.description}
        </LinkPreviewDescription>
        <Domain>
          <LinkIcon src={LinkSvg} alt="" />
          {extractHostname(tweet.linked_site.url)}
        </Domain>
      </LinkPreviewText>
    </LinkPreviewStyled>
  );
}

function extractHostname(url: string): string {
  try {
    let hostname: string;

    if (url.indexOf('//') > -1) {
      hostname = url.split('/')[2];
    } else {
      hostname = url.split('/')[0];
    }

    hostname = hostname.split(':')[0];
    hostname = hostname.split('?')[0];

    return hostname;
  } catch (error) {
    return '';
  }
}

const LinkIcon = styled('img')`
  margin-bottom: 2px;
  margin-right: 0.5em;
  height: 0.9rem;
  vertical-align: middle;
`;

const Domain = styled('div')`
  font-size: 0.85em;
  color: ${tailwindColors.gray300};
`;

const LinkPreviewDescription = styled('div')`
  font-size: 0.85em;
  color: ${tailwindColors.gray200};
`;

const LinkPreviewText = styled('div')`
  padding: ${spacing.default};
  display: grid;
  grid-template-rows: 1fr auto;
  grid-row-gap: ${spacing.half};
`;

const LinkPreviewStyled = styled('a')`
  display: block;
  background-color: ${transparentizeHex(
    tailwindColors.gray100,
    0.1
  )} !important;
  border-radius: 6px;
  border: 2px solid ${tailwindColors.gray700};
`;

const LinkPreviewImg = styled('img')`
  border-top-left-radius: ${layout.borderRadius};
  border-top-right-radius: ${layout.borderRadius};
  margin: 0;
`;

function getText(tweet: TweetData): string {
  if (isRetweet(tweet) && hasLinkPreview(tweet)) return null;
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

function TweetText({ tweet }: TweetProps) {
  const text = getText(tweet);

  if (!text) return null;

  return <TweetTextStyled>{text}</TweetTextStyled>;
}

const TweetTextStyled = styled('div')`
  white-space: pre-wrap;
  margin-bottom: ${spacing.default};
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
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.5);

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
