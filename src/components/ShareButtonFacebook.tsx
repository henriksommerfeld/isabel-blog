import React from 'react';
import FacebookLogoSvg from '../../static/img/facebook.svg';
import ShareButton from './ShareButton';

interface ShareLinkFacebookProps {
  url: string;
}

export default function ShareButtonFacebook({ url }: ShareLinkFacebookProps) {
  if (!url) return null;

  const shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    url
  )}`;

  return (
    <ShareButton url={shareLink} icon={FacebookLogoSvg}>
      Dela på Facebook
    </ShareButton>
  );
}
