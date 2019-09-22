import React, { useState, useEffect, useRef } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Index } from 'elasticlunr';
import styled from 'styled-components';
import { useGlobal } from 'reactn';
import { colors, layout, zIndexes } from '../constants';
import { tailwindColors } from '../tailwind-colors';
import { transparentizeHex } from '../color-convertions';
import SearchWhiteSvg from '../../static/img/search-white.svg';
import SearchGreySvg from '../../static/img/search-grey100.svg';

export default function Search({ location }) {
  const [hasFocus, setHasFocus] = useState(false);
  const data = useStaticQuery(searchIndexQuery);
  const index = Index.load(data.siteSearchIndex.index);
  const [, setResults] = useGlobal<SearchResults>('searchResults');
  const [route, setRoute] = useGlobal<SearchRoute>('searchRoute');
  const [query, setQuery] = useGlobal<SearchQuery>('searchQuery');
  const getPreviousQuery = path => (route === path ? query : '');
  const searchBoxRef = useRef(null);

  useEffect(() => {
    if (!route) searchBoxRef.current.value = '';
  }, [route]);

  const searchClicked = () => {
    console.log('Search clicked', query);
  };

  const queryInputChanged = evt => {
    const newQuery = evt.target.value;
    if (newQuery.length > 2) {
      setQuery(newQuery);
      setRoute(location.pathname);
      search(newQuery);
    }
  };

  const search = enteredQuery => {
    const response = index
      .search(enteredQuery, { expand: true })
      .map(({ ref }) => index.documentStore.getDoc(ref));

    setResults(response || []);
  };

  const onBlur = () => {
    setHasFocus(false);
  };

  return (
    <>
      <SearchArea>
        <SearchBox hasFocus={hasFocus}>
          <label htmlFor="searchbox" className="screen-reader-text">
            {`Ange dina sökord här... ${hasFocus}`}
          </label>
          <SearchBoxInput
            id="searchbox"
            ref={searchBoxRef}
            type="search"
            role="entry"
            placeholder="Ange dina sökord här..."
            defaultValue={getPreviousQuery(location.pathname)}
            onChange={queryInputChanged}
            onFocus={() => setHasFocus(true)}
            onBlur={onBlur}
          />
          <SearchButton
            onClick={searchClicked}
            aria-label="Sök"
            onFocus={() => setHasFocus(true)}
            onBlur={onBlur}
          >
            <SearchIcon
              src={hasFocus ? SearchWhiteSvg : SearchGreySvg}
              aria-hidden
            />
          </SearchButton>
        </SearchBox>
      </SearchArea>
    </>
  );
}

const SearchArea = styled('div')`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: ${layout.contentMaxWidth}px;
  padding: 1rem;
`;

const SearchBox = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.5em;
  width: 100%;
  border-radius: ${layout.borderRadius};
  border-width: 2px;
  border-style: solid;
  border-color: ${({ hasFocus }) =>
    hasFocus ? colors.white : tailwindColors.gray100};

  background-color: ${({ hasFocus }) =>
    transparentizeHex(colors.white, hasFocus ? 0.7 : 0.6)};
`;

const SearchBoxInput = styled('input')`
  width: 100%;
  z-index: ${zIndexes.searchBox};
  background-color: transparent;
  border: none;
  caret-color: ${tailwindColors.red700};
  color: ${colors.black};
`;

const SearchButton = styled('button')`
  background: none;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchIcon = styled('img')`
  margin: 0;
  width: 1.5em;
`;

export interface SearchRoute {
  searchRoute: string;
}
export interface SearchQuery {
  searchQuery: string;
}
export interface SearchResults {
  searchResults: any[];
}

const searchIndexQuery = graphql`
  query SearchIndexQuery {
    siteSearchIndex {
      index
    }
  }
`;
