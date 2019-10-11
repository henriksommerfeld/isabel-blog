import React from 'react';
import LinkedInLogoSvg from '../../static/img/linkedin-color.svg';
import ShareButton from './ShareButton';
import { colors } from '../constants';

interface ShareButtonLinkedInProps {
  url: string;
}

export default function ShareButtonLinkedIn({ url }: ShareButtonLinkedInProps) {
  if (!url) return null;

  const shareLink = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
    url
  )}`;

  return (
    <ShareButton url={shareLink} icon={LinkedInLogoSvg} color={colors.linkedIn}>
      Dela på LinkedIn
    </ShareButton>
  );
}
