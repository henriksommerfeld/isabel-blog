import React from 'react';
import styled from 'styled-components';
import { spacing } from '../constants';
import ShareButtonFacebook from './ShareButtonFacebook';
import ShareButtonTwitter from './ShareButtonTwitter';
import ShareButtonLinkedIn from './ShareButtonLinkedIn';

interface ShareLinksProps {
  url: string;
}

export default function ShareLinks({ url }: ShareLinksProps) {
  return (
    <ButtonContainer>
      <ShareButtonFacebook url={url} />
      <ShareButtonTwitter url={url} />
      <ShareButtonLinkedIn url={url} />
    </ButtonContainer>
  );
}

const ButtonContainer = styled('div')`
  display: grid;
  grid-row-gap: ${spacing.default};
  width: 100%;
  padding: ${spacing.default} 0 0 0;
`;
