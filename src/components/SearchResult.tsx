import React, { useState } from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import styled from 'styled-components';
import { useGlobalState } from '../useGlobalState';
import { globalStates, colors } from '../constants';
import { transparentizeHex } from '../color-convertions';

export function SearchResult() {
  const [results] = useGlobalState(globalStates.searchResults, []);
  console.log(results);

  if (!results || !Array.isArray(results)) return null;

  if (results.length < 1) return <div>Inga träffar</div>;

  return (
    <>
      <SearchResults className="search-results">
        <ul>
          {results.map(page => (
            <li key={page.id}>
              <Link to={page.path}>{page.title}</Link>
            </li>
          ))}
        </ul>
      </SearchResults>
      <Blur />
    </>
  );
}

const SearchResults = styled('div')`
  display: flex;
  justify-content: center;
  position: absolute;
  top: ${156}px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
`;

const Blur = styled('div')`
  position: absolute;
  top: ${156}px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  filter: blur(2px);
  background-color: ${transparentizeHex(colors.white, 0.9)};
`;
