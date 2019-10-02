import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { spacing, colors, breakpoints } from '../constants';
import { tailwindColors } from '../tailwind-colors';
import Tweets from './Tweets';

interface Footer {
  editLink?: string;
  showTweets?: boolean;
}

export default function Footer({
  editLink = '/admin',
  showTweets = true,
}: Footer) {
  return (
    <FooterWrapper useMarginTop={showTweets}>
      {showTweets && <Tweets />}
      <InnerFooter>
        FOOTER 🧁.{' '}
        <a
          href={editLink || '/admin'}
          target="_blank"
          rel="noopener noreferrer"
        >
          Redigera sidan
        </a>
      </InnerFooter>
    </FooterWrapper>
  );
}

const FooterWrapper = styled('div')`
  box-shadow: 0 -1px 20px rgba(0, 0, 0, 0.5);
  margin-top: ${({ useMarginTop }) =>
    useMarginTop ? spacing.paddingDouble : 0};
`;

const InnerFooter = styled('footer')`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${spacing.paddingDefault};
  background-color: ${colors.footerBackground};
  color: ${tailwindColors.blue100};
`;
