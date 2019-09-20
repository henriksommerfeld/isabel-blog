import React, { useState } from 'react';
import styled from 'styled-components';
import { colors, breakpoints, spacing, layout } from '../constants';
import { tailwindColors } from '../tailwind-colors';
import { transparentizeHex } from '../color-convertions';
import SearchWhiteSvg from '../../static/img/search-white.svg';
import SearchGreySvg from '../../static/img/search-grey100.svg';

export default function Search() {
  const [queryInput, setQueryInput] = useState('');
  const [hasFocus, setHasFocus] = useState(false);

  const searchClicked = () => {
    console.log('Search clicked', queryInput);
  };

  const queryInputChanged = evt => {
    setQueryInput(evt.target.value);
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
            type="search"
            role="entry"
            placeholder="Ange dina sökord här..."
            onChange={queryInputChanged}
            onFocus={() => setHasFocus(true)}
            onBlur={() => setHasFocus(false)}
          />
          <SearchButton
            onClick={searchClicked}
            aria-label="Sök"
            onFocus={() => setHasFocus(true)}
            onBlur={() => setHasFocus(false)}
          >
            <SearchIcon
              src={hasFocus ? SearchWhiteSvg : SearchGreySvg}
              aria-hidden
            />
          </SearchButton>
        </SearchBox>
      </SearchArea>
      <SearchResult />
    </>
  );
}

const SearchResult = styled('div')``;

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
