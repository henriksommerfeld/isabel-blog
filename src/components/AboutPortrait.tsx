import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import PreviewCompatibleImage from '../components/PreviewCompatibleImage';
import { tailwindColors } from '../tailwind-colors';
import { useSpring, animated, config } from 'react-spring';
import { useSwipeable } from 'react-swipeable';
import { spacing } from '../constants';

export function AboutPortrait({ image }) {
  const [rotate, setRotate] = useState(false);
  const rotatableRef = useRef(null);
  const handlers = useSwipeable({ onSwipedLeft, onSwipedRight, ...config });
  const rotateAnimation = useSpring({
    to: {
      transform: rotate ? `rotateY(-180deg)` : `rotateY(0deg)`,
    },
    config: config.wobbly,
  });

  function clickEffect(e) {
    if (e.detail !== 3) return;
    setRotate(x => !x);
  }

  function onSwipedRight(e) {
    if (!rotate) return;
    setRotate(false);
  }

  function onSwipedLeft(e) {
    if (rotate) return;
    setRotate(true);
  }

  return (
    <Perspective>
      <Rotatable
        ref={rotatableRef}
        style={rotateAnimation}
        onClick={clickEffect}
        {...handlers}
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
  margin: `0 0 ${spacing.double} 0`,
};
