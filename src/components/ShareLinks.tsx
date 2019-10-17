import React from 'react';
import styled from 'styled-components';
import { spacing, breakpoints } from '../constants';
import ShareButtonFacebook from './ShareButtonFacebook';
import ShareButtonTwitter from './ShareButtonTwitter';
import ShareButtonLinkedIn from './ShareButtonLinkedIn';

interface ShareLinksProps {
  url: string;
}

export default function ShareLinks({ url }: ShareLinksProps) {
  return (
    <ButtonContainer data-testid="share-links">
      <ShareButtonFacebook url={url} />
      <ShareButtonTwitter url={url} />
      <ShareButtonLinkedIn url={url} />
    </ButtonContainer>
  );
}

const ButtonContainer = styled('div')`
  display: grid;
  grid-gap: ${spacing.default};
  width: 100%;
  padding: ${spacing.double} 0 0 0;

  @media (min-width: ${breakpoints.medium}) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;
