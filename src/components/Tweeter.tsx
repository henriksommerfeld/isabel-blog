import React from 'react';
import styled, { css } from 'styled-components';
import { TweetData, TwitterImage } from './Tweets';
import { isRetweet } from './Tweet';
import { spacing, colors } from '../constants';
import PreviewCompatibleImage from './PreviewCompatibleImage';

interface TweeterProps {
  tweet: TweetData;
  images?: TwitterImage[];
}

export function Tweeter({ tweet, images = [] }: TweeterProps) {
  const user = isRetweet(tweet) ? tweet.retweeted_status.user : tweet.user;
  const profileImageName = getImageNameFromUrl(user.profile_image_url_https);
  const sharpImage = images.find(x => x.name + x.ext === profileImageName);
  const imageToUse =
    sharpImage && sharpImage.childImageSharp
      ? sharpImage
      : user.profile_image_url_https;

  return (
    <TweeterStyled
      href={GetProfileUrl(user.screen_name)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <PreviewCompatibleImage image={imageToUse} style={profileImageStyles} />
      <NameStyled>
        <RealNameStyled>{user.name}</RealNameStyled>
        <UserNameStyled>@{user.screen_name}</UserNameStyled>
      </NameStyled>
    </TweeterStyled>
  );
}

function getImageNameFromUrl(url: string): string {
  if (!url) return url;

  const fileParts = url.split('/').filter(x => x);
  const filename = fileParts[fileParts.length - 1];

  return filename.replace('_normal.', '_bigger.');
}

function GetProfileUrl(screenName: string): string {
  return `https://twitter.com/${screenName}`;
}

const TweeterStyled = styled('a')`
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: ${spacing.default};
`;

const profileImageStyles = {
  borderRadius: '50%',
  border: `2px solid ${colors.white}`,
  margin: 0,
  width: '50px',
};

const NameStyled = styled('div')``;

const RealNameStyled = styled('div')``;

const UserNameStyled = styled('div')`
  font-size: 0.8em;
`;
