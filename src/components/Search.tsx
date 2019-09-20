import React, { useState } from 'react';
import styled from 'styled-components';
import { colors, breakpoints, spacing, layout } from '../constants';
import { tailwindColors } from '../tailwind-colors';
import { transparentizeHex } from '../color-convertions';
import SearchWhiteSvg from '../../static/img/search.svg';
import SearchRedSvg from '../../static/img/search-red700.svg';

export default function Search() {
  const [queryInput, setQueryInput] = useState('');

  const searchClicked = () => {
    console.log('Search clicked', queryInput);
  };

  const queryInputChanged = evt => {
    setQueryInput(evt.target.value);
  };

  return (
    <SearchArea>
      <SearchBox>
        <label for="searchbox" className="screen-reader-text">
          Ange dina sökord här...
        </label>
        <SearchBoxInput
          id="searchbox"
          type="search"
          role="entry"
          placeholder="Ange dina sökord här..."
          onChange={queryInputChanged}
        />
        <SearchButton onClick={searchClicked} aria-label="Sök">
          <SearchIcon src={SearchRedSvg} aria-hidden />
        </SearchButton>
      </SearchBox>
    </SearchArea>
  );
}

const SearchArea = styled('div')`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 1rem;
`;

const SearchBox = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.5em;
  width: 100%;
  max-width: ${layout.contentMaxWidth}px;
  border-radius: ${layout.borderRadius};
  border: ${transparentizeHex(colors.white, 0.7)} solid 1px;
  /* transition: background-color 150ms ease; */
  background-color: ${transparentizeHex(colors.white, 0.7)};
`;

const SearchBoxInput = styled('input')`
  width: 100%;
  background-color: transparent;
  border: none;
  caret-color: ${colors.white};
  color: ${colors.black};

  ::placeholder {
    color: ${colors.black};
  }
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
