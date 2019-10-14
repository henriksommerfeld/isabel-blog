import React from 'react';
import styled from 'styled-components';
import {
  spacing,
  colors,
  breakpoints,
  links,
  emailAddress,
} from '../constants';
import { tailwindColors } from '../tailwind-colors';
import Tweets from './Tweets';
import EditSvg from '../../static/img/edit-filled.svg';
import { Link } from 'gatsby';
import ConfettiBomb from './ConfettiBomb';

interface Footer {
  editLink?: string;
  showTweets?: boolean;
}

export default function Footer({
  editLink = '/admin',
  showTweets = true,
}: Footer) {
  return (
    <FooterWrapper>
      {showTweets && <Tweets />}
      <InnerFooter>
        <div>
          <Heading>Kontakt</Heading>
          <div>{emailAddress}</div>
          <div>
            <a href={links.linkedin.url}>{links.linkedin.title}</a>
          </div>
        </div>
        <div>
          <Heading>Integritet och upphovsrätt</Heading>
          <div>
            <LinkStyled to={links.cookies.url}>
              {links.cookies.title}
            </LinkStyled>
          </div>
          <div>
            <LinkStyled to={links.website.url}>
              {links.website.title}
            </LinkStyled>
          </div>
        </div>
        <EditContainer>
          <ConfettiBomb />
          <AnchorWithIcon
            href={editLink || '/admin'}
            target="_blank"
            rel="noopener noreferrer"
            title="Redigera sidan"
          >
            <Svg src={EditSvg} alt="Redigera sidan" />
          </AnchorWithIcon>
        </EditContainer>
      </InnerFooter>
    </FooterWrapper>
  );
}

const FooterWrapper = styled('div')`
  box-shadow: 0 -1px 20px rgba(0, 0, 0, 0.5);
  overflow: hidden;
`;

const InnerFooter = styled('footer')`
  display: grid;
  grid-row-gap: ${spacing.double};
  padding: ${spacing.default};
  background-color: ${colors.footerBackground};
  color: ${tailwindColors.blue100};

  @media (min-width: ${breakpoints.small}) {
    grid-template-columns: 1fr 1fr auto;
    padding: ${spacing.double};
  }
`;

const EditContainer = styled('div')`
  display: none;

  @media (min-width: ${breakpoints.small}) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
  }
`;

const Heading = styled('h3')`
  margin-bottom: ${spacing.half};
`;

const LinkStyled = styled(Link)``;

const AnchorWithIcon = styled('a')`
  :hover,
  :focus,
  :active {
    background: none;
  }
`;

const Svg = styled('img')`
  height: 1em;
  margin-right: 4px;
`;
