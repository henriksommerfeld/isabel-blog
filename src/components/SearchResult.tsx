import React, { useState } from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import styled from 'styled-components';
import { colors, layout, spacing } from '../constants';
import { transparentizeHex } from '../color-convertions';
import { useGlobal } from 'reactn';
import { SearchQuery, SearchRoute, SearchResults } from './Search';
import CloseSvg from '../../static/img/close.svg';
import { useEscKey } from '../useEscKey';
import { useTransition, animated, config } from 'react-spring';

export function SearchResult({ location }) {
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

  const closeButtonClicked = () => {
    closeSearch();
  };

  return containerTransitions.map(
    ({ item, key, props }) =>
      item && (
        <SearchResultsContainer key={key} style={props}>
          <CloseButtonStyled onClick={closeButtonClicked}>
            <CloseIcon src={CloseSvg} />
          </CloseButtonStyled>
          <SearchResultsStyled className="search-results">
            <h2>
              {results.length ? results.length : 'Inga'} träffar för{' '}
              <em>{query}</em>
            </h2>
            <ul>
              {results.map(page => (
                <li key={page.id}>
                  <Link to={page.path}>{page.title}</Link>
                </li>
              ))}
            </ul>
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

const CloseButtonStyled = styled('button')`
  /* background: none;
  border: none;
  position: absolute;
  top: ${spacing.paddingDouble};
  right: ${spacing.paddingDouble};
  margin: 0;
  padding: 0;
  cursor: pointer; */

    background: ${colors.white};
    border: none;
    position: absolute;
    top: ${spacing.paddingDouble};
  right: ${spacing.paddingDouble};
    margin: 0;
    padding: 5px;
    cursor: pointer;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.5);
    transition: transform 500ms ease;

    &:hover {
      transform: rotate(180deg) scale(1.1);
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
  /* bottom: 0; */
  /* max-width: ${layout.contentMaxWidth}px; */
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
  background-color: ${transparentizeHex(colors.white, 0.9)};
  border-radius: ${layout.borderRadius};
  padding: ${spacing.paddingDouble};
  margin: ${spacing.paddingDouble};

  @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2);
  }
`;
