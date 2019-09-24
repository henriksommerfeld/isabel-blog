import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { colors, layout, spacing, breakpoints } from '../constants';
import { transparentizeHex } from '../color-convertions';
import { useGlobal } from 'reactn';
import { SearchQuery, SearchRoute, SearchResults } from './Search';
import CloseSvg from '../../static/img/close.svg';
import BlogPostSvg from '../../static/img/blog-post-grey500.svg';
import { useEscKey } from '../useEscKey';
import { useTransition, animated, config } from 'react-spring';
import { WindowLocation } from '@reach/router';

interface SearchResultProps {
  location: WindowLocation;
}

export function SearchResult({ location }: SearchResultProps) {
  const [results, setResults] = useGlobal<SearchResults>('searchResults');
  const [route, setRoute] = useGlobal<SearchRoute>('searchRoute');
  const [query, setQuery] = useGlobal<SearchQuery>('searchQuery');
  const containerTransitions = useTransition(
    shouldShowResults(results, route, location.pathname),
    null,
    opacityTransition
  );

  const closeSearch = () => {
    setRoute('');
    setQuery('');
    setResults([]);
  };

  useEscKey(closeSearch);

  return containerTransitions.map(
    ({ item, key, props }) =>
      item && (
        <SearchResultsContainer key={key} style={props}>
          <SearchResultsStyled className="search-results">
            <CloseButtonStyled onClick={closeSearch}>
              <CloseIcon src={CloseSvg} />
            </CloseButtonStyled>
            <h2>
              {results.length ? results.length : 'Inga'} träffar för{' '}
              <em>{query}</em>
            </h2>
            <LinksContainer>
              {results.map(page => (
                <LinkContainer key={page.id}>
                  <LinkIconSvg src={BlogPostSvg} alt="" />
                  <Link to={page.path}>{page.title}</Link>
                </LinkContainer>
              ))}
            </LinksContainer>
          </SearchResultsStyled>
        </SearchResultsContainer>
      )
  );
}

const opacityTransition = {
  from: { opacity: 0 },
  enter: { opacity: 1 },
  leave: { opacity: 0 },
  config: config.stiff,
};

function shouldShowResults(
  results: any,
  route: string,
  location: string
): boolean {
  if (route !== location) return false;
  if (!results || !Array.isArray(results)) return false;
  return true;
}

const LinkIconSvg = styled('img')`
  margin: 0 0.5em 0 0;
  min-width: 1rem;
  vertical-align: sub;
`;

const LinkContainer = styled('li')`
  list-style: none;
`;

const LinksContainer = styled('ul')`
  margin: 0;
`;

const CloseButtonStyled = styled('button')`
  background: ${colors.white};
  border: none;
  position: absolute;
  top: ${spacing.paddingDefault};
  right: ${spacing.paddingDefault};
  margin: 0;
  padding: 5px;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.6);
  transition: transform 400ms ease, box-shadow 200ms ease;

  @media (min-width: ${breakpoints.small}) {
    top: -${spacing.paddingDefault};
    right: -${spacing.paddingDefault};
  }
  &:hover {
    transform: rotate(180deg) scale(1.1);
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
  }
`;

const CloseIcon = styled('img')`
  width: 2rem;
  margin: 0;
`;

const SearchResultsContainer = styled(animated.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  height: auto;
  min-height: 100%;
  top: ${156}px;
  left: 0;
  right: 0;
  box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.5);
  background-color: ${colors.white};

  @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    background-color: ${transparentizeHex(colors.white, 0.8)};
  }
`;

const SearchResultsStyled = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background-color: ${transparentizeHex(colors.white, 0.9)};
  border-radius: ${layout.borderRadius};
  padding: ${spacing.paddingDouble} ${spacing.paddingDefault};
  width: 100%;

  @media (min-width: ${breakpoints.small}) {
    margin: ${spacing.paddingDouble};
    padding: ${spacing.paddingDouble};
    width: auto;
  }

  @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  }
`;
