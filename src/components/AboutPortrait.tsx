import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import PreviewCompatibleImage from '../components/PreviewCompatibleImage';
import { tailwindColors } from '../tailwind-colors';
import Confetti from 'react-dom-confetti';
import { useSpring, animated, config } from 'react-spring';

export function AboutPortrait({ image }) {
  const [rotate, setRotate] = useState(false);
  const confettiActive = !rotate;
  const rotatableRef = useRef(null);
  const rotateAnimation = useSpring({
    to: {
      transform: rotate ? `rotateY(180deg)` : `rotateY(0deg)`,
    },
    config: config.wobbly,
  });

  const confettiConfig = {
    angle: 90,
    spread: 360,
    startVelocity: 60,
    elementCount: 150,
    decay: 0.82,
  };

  function clickEffect(e) {
    if (e.detail !== 3) return;
    setRotate(x => !x);
  }

  return (
    <Perspective>
      <Confetti active={confettiActive} config={confettiConfig} />
      <Rotatable
        rotate={rotate}
        ref={rotatableRef}
        style={rotateAnimation}
        onClick={clickEffect}
      >
        <PreviewCompatibleImage image={image} style={portraitStyles} />
      </Rotatable>
    </Perspective>
  );
}

const Perspective = styled('div')`
  perspective: 1000px;
`;

const Rotatable = styled(animated.div)`
  display: inline-block;
  transform-style: preserve-3d;
  position: relative;
`;

const portraitStyles = {
  borderRadius: '50%',
  border: '0.5em solid white',
  boxShadow: `0 1px 5px ${tailwindColors.gray600}`,
  width: '300px',
  margin: '0 0 2rem 0',
};
