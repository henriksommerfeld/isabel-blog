import React, { useState } from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import styled from 'styled-components';
import { colors, layout, spacing } from '../constants';
import { transparentizeHex } from '../color-convertions';
import { useGlobal } from 'reactn';
import { SearchQuery, SearchRoute, SearchResults } from './Search';
import CloseSvg from '../../static/img/close.svg';

export function SearchResult({ location }) {
  const [results] = useGlobal<SearchResults>('searchResults');
  const [route] = useGlobal<SearchRoute>('searchRoute');
  const [query] = useGlobal<SearchQuery>('searchQuery');

  if (!shouldShowResults(results, route, location.pathname)) return null;

  return (
    <SearchResultsContainer>
      <CloseButtonStyled>
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
  );
}

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
  background: none;
  border: none;
  position: absolute;
  top: ${spacing.paddingDouble};
  right: ${spacing.paddingDouble};
  margin: 0;
`;

const CloseIcon = styled('img')`
  width: 2rem;
`;

const SearchResultsContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  height: auto;
  /* min-height: 100%; */
  top: ${156}px;
  left: 0;
  right: 0;
  /* bottom: 0; */
  box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.5);
  background-color: ${colors.white};

  @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
    -webkit-backdrop-filter: blur(20px);
    backdrop-filter: blur(20px);
    background-color: ${transparentizeHex(colors.white, 0.8)};
  }
`;

const SearchResultsStyled = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${transparentizeHex(colors.white, 0.5)};
  border-radius: ${layout.borderRadius};
  padding: ${spacing.paddingDouble};
  margin: ${spacing.paddingDouble};
`;
