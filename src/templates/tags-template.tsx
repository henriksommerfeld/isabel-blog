import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { colors, breakpoints, spacing, layout } from '../constants';
import tagBackground from '../../static/img/tag-bg.svg';
import Search from '../components/Search';
import { WindowLocation } from '@reach/router';
import { transparentizeHex } from '../color-convertions';
import { tailwindColors } from '../tailwind-colors';

interface TagsTemplateProps {
  children: ReactNode;
  location: WindowLocation;
}

export function TagsTemplate({ children, location }: TagsTemplateProps) {
  return (
    <Page>
      <Banner>
        <Search location={location} />
      </Banner>
      <Text>
        <ContentBox>{children}</ContentBox>
      </Text>
    </Page>
  );
}

const ContentBox = styled('div')`
  font-size: 1.1em;
  border-radius: ${layout.borderRadius};
  max-width: ${layout.contentMaxWidth}px;
  border: 1px solid ${tailwindColors.gray300};

  ul {
    list-style: none;
    margin: 0;
  }

  @media (min-width: ${breakpoints.small}) {
    padding: 2rem;
    background: rgba(255, 255, 255, 0.7);

    h1,
    p {
      text-align: center;
    }
  }
`;

const Banner = styled('div')`
  display: flex;
  justify-content: center;
  background-color: ${colors.headerBackground};
`;

const Text = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-grow: 1;
  padding: ${spacing.paddingDouble} ${spacing.paddingDefault};
  background: ${transparentizeHex(colors.white, 0.7)};
  height: 100%;
  width: 100%;
  min-height: calc(100vh - 100px);

  @media (min-width: ${breakpoints.small}) {
    background: none;
    height: auto;
    min-height: initial;
  }
`;

const Page = styled('div')`
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 160px);
  display: flex;
  flex-direction: column;
  background-image: url(${tagBackground});
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position-x: center;
  background-position-y: center;
  background-size: 90%;

  @media (min-width: ${breakpoints.small}) {
    background-color: ${colors.pageBackground};
    background-position-x: 20%;
    background-position-y: 40%;
    background-size: 40%;
  }
`;
