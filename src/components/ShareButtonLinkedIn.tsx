import React from 'react';
import LinkedInLogoSvg from '../../static/img/linkedin.svg';
import ShareButton from './ShareButton';

interface ShareButtonLinkedInProps {
  url: string;
}

export default function ShareButtonLinkedIn({ url }: ShareButtonLinkedInProps) {
  if (!url) return null;

  const shareLink = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
    url
  )}`;

  return (
    <ShareButton url={shareLink} icon={LinkedInLogoSvg}>
      Dela på LinkedIn
    </ShareButton>
  );
}
