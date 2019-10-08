import React from 'react';
import FacebookLogoSvg from '../../static/img/facebook-color.svg';
import ShareButton from './ShareButton';
import { colors } from '../constants';

interface ShareLinkFacebookProps {
  url: string;
}

export default function ShareButtonFacebook({ url }: ShareLinkFacebookProps) {
  if (!url) return null;

  const shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    url
  )}`;

  return (
    <ShareButton url={shareLink} icon={FacebookLogoSvg} color={colors.facebook}>
      Dela på Facebook
    </ShareButton>
  );
}
