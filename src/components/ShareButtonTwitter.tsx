import React from 'react';
import TwitterLogoSvg from '../../static/img/twitter.svg';
import ShareButton from './ShareButton';

interface ShareLinkTwitterProps {
  url: string;
}

export default function ShareButtonTwitter({ url }: ShareLinkTwitterProps) {
  if (!url) return null;
  const encodedUrl = encodeURIComponent(url);

  const shareLink = `https://twitter.com/intent/tweet?url=${encodedUrl}`;

  return (
    <ShareButton url={shareLink} icon={TwitterLogoSvg}>
      Dela på Twitter
    </ShareButton>
  );
}
