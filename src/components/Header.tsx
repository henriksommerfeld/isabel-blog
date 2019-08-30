import React, { useState } from 'react';
import styled from 'styled-components';
import { colors } from '../variables';
import { Link } from 'gatsby';
import { useSpring, animated, config } from 'react-spring';

export default function Header() {
  const [mobileMenuIsVisible, setMobileMenuIsVisible] = useState(false);
  const toggleMenu = () => setMobileMenuIsVisible(x => !x);

  return (
    <NavStyled>
      <a href="/" aria-label="till startsidan">
        <div>Isabel Sommerfeld</div>
      </a>
      {/* <Hamburger isOpen={mobileMenuIsVisible} clickAction={toggleMenu} /> */}
      <MenuIcon isOpen={mobileMenuIsVisible} clickAction={toggleMenu} />
      <Links visible={false}>
        <Link to="/om">Om mig</Link>
        <Link to="/publicerat">Publicerat</Link>
        <Link to="/blog">Pressbilder</Link>
      </Links>
    </NavStyled>
  );
}

const Links = styled('div')`
  display: ${(props: { visible: boolean }) => (props.visible ? null : 'none')};
`;

const NavStyled = styled('nav')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: ${colors.headerBackground};
  box-shadow: 0 1px 20px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const hamburgerStyle = {
  top: 'translate(2, 7) rotate(0)',
  center: 'translate(2, 19) rotate(0)',
  bottom: 'translate(2, 31) rotate(0)',
  color: '#fff',
};

const crossStyle = {
  top: 'translate(5, 32) rotate(-45)',
  center: 'translate(10, 4) rotate(45)',
  bottom: 'translate(5, 32) rotate(-45)',
  color: 'lightblue',
};

export function MenuIcon({ isOpen, clickAction }: Hamburger) {
  const { top, center, bottom, color } = useSpring({
    to: isOpen ? crossStyle : hamburgerStyle,
    config: config.stiff,
  });
  return (
    <animated.svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      onClick={clickAction}
    >
      <animated.rect width="40" height="6" rx="1" transform={top} />
      <animated.rect width="40" height="6" rx="1" transform={center} />
      <animated.rect width="40" height="6" rx="1" transform={bottom} />
    </animated.svg>
  );
}

interface Hamburger {
  isOpen: boolean;
  clickAction: React.MouseEvent<HTMLInputElement>;
}
