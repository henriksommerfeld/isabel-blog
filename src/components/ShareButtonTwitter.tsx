import React from 'react';
import TwitterLogoSvg from '../../static/img/twitter-color.svg';
import ShareButton from './ShareButton';
import { colors } from '../constants';

interface ShareLinkTwitterProps {
  url: string;
}

export default function ShareButtonTwitter({ url }: ShareLinkTwitterProps) {
  if (!url) return null;
  const encodedUrl = encodeURIComponent(url);

  const shareLink = `https://twitter.com/intent/tweet?url=${encodedUrl}`;

  return (
    <ShareButton url={shareLink} icon={TwitterLogoSvg} color={colors.twitter}>
      Dela på Twitter
    </ShareButton>
  );
}
