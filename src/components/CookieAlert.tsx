import React from 'react';
import styled from 'styled-components';
import { spacing, breakpoints } from '../constants';
import { tailwindColors } from '../tailwind-colors';
import { Link } from 'gatsby';
import Button from './Button';
import { useStateWithLocalStorage } from '../useStateWithLocalStorage';

export function CookieAlert() {
  const [cookiesAccepted, setCookiesAccepted] = useStateWithLocalStorage<
    boolean
  >('cookies-accepted', false);

  function okButtonClicked() {
    setCookiesAccepted(true);
  }

  if (cookiesAccepted) return null;

  return (
    <CookieContainer className="cookie-alert cookies ad advertisement banner">
      <div>
        Genom att använda min webbplats samtycker du till min användning av
        cookies. Läs mer på sidan{' '}
        <Link to={'/cookies'}>Om cookies 🍪 (webbkakor)</Link>.
      </div>
      <ButtonContainer>
        <Button clickHandler={okButtonClicked}>Okej 🙄</Button>
      </ButtonContainer>
    </CookieContainer>
  );
}

const CookieContainer = styled('div')`
  display: grid;
  grid-template-rows: 1fr auto;
  grid-gap: ${spacing.default};
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${tailwindColors.gray300};
  padding: ${spacing.default};
  box-shadow: 0 -1px 20px rgba(0, 0, 0, 0.5);

  @media (min-width: ${breakpoints.small}) {
    grid-template-columns: auto 10rem;
    grid-template-rows: auto;
  }
`;

const ButtonContainer = styled('div')`
  display: flex;
  align-items: flex-end;
`;
