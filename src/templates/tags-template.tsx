import React from 'react';
import styled from 'styled-components';
import { colors, breakpoints, spacing, layout } from '../constants';
import tagBackground from '../../static/img/tag-bg.svg';
import linkArrow from '../../static/img/link-arrow.svg';

export function TagsTemplate({ children }) {
  return (
    <Page>
      <Text>
        <ContentBox>{children}</ContentBox>
      </Text>
    </Page>
  );
}

const ContentBox = styled('div')`
  font-size: 1.2rem;
  border-radius: ${layout.borderRadius};

  ul {
    list-style: none;
    margin: 0;

    li::before {
      content: url(${linkArrow});
      margin-right: 0.5em;
    }
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

const Text = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-grow: 1;
  padding: ${spacing.paddingDouble} ${spacing.paddingDefault};
  background: rgba(255, 255, 255, 0.7);
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
  display: flex;
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
