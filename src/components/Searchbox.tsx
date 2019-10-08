import React, { useState, useEffect, useRef } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Index } from 'elasticlunr';
import styled from 'styled-components';
import { useGlobal } from 'reactn';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';
import { colors, layout, zIndexes } from '../constants';
import { tailwindColors } from '../tailwind-colors';
import { transparentizeHex } from '../color-convertions';
import SearchWhiteSvg from '../../static/img/search-white.svg';
import SearchGreySvg from '../../static/img/search-grey100.svg';
import { LocationProp } from 'interfaces/LocationProp';

export default function Searchbox({ location }: LocationProp) {
  const [hasFocus, setHasFocus] = useState(false);
  const data = useStaticQuery(searchIndexQuery);
  const index = Index.load(data.siteSearchIndex.index);
  const [, setResults] = useGlobal<SearchResults>('searchResults');
  const [route, setRoute] = useGlobal<SearchRoute>('searchRoute');
  const [query, setQuery] = useGlobal<SearchQuery>('searchQuery');
  const getPreviousQuery = path => (route === path ? query : '');
  const searchBoxRef = useRef(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();
  const confettiTriggers = ['🎉', '🎊', '🥳'];

  useEffect(() => {
    if (!route) {
      searchBoxRef.current.value = '';
      setShowConfetti(false);
    }
  }, [route]);

  const queryInputChanged = evt => {
    setShowConfetti(false);
    const newQuery = evt.target.value.trim();
    if (newQuery.length > 2) {
      setQuery(newQuery);
      setRoute(location.pathname);
      search(newQuery);
    } else if (confettiTriggers.includes(newQuery.trim())) {
      setShowConfetti(true);
    }
  };

  const search = enteredQuery => {
    const response = index
      .search(enteredQuery, { expand: true, bool: 'AND' })
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
          <SearchBoxInput
            id="searchbox"
            ref={searchBoxRef}
            type="search"
            role="search"
            aria-label="Ange dina sökord här..."
            placeholder="Ange dina sökord här..."
            defaultValue={getPreviousQuery(location.pathname)}
            onChange={queryInputChanged}
            onFocus={() => setHasFocus(true)}
            onBlur={onBlur}
          />
          <SearchIcon
            src={hasFocus ? SearchWhiteSvg : SearchGreySvg}
            aria-hidden
          />
        </SearchBox>
        {showConfetti ? <Confetti width={width} height={height} /> : null}
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

  @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
  }
`;

const SearchBoxInput = styled('input')`
  width: 100%;
  z-index: ${zIndexes.searchBox};
  background-color: transparent;
  border: none;
  caret-color: ${tailwindColors.red700};
  color: ${colors.black};
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