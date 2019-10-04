import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { spacing, buttonStyles } from '../constants';
import DownloadSvg from '../../static/img/download-filled.svg';
import { RipplesButton } from './RipplesButton';
import { ButtonText } from './ButtonText';

interface DownloadButton {
  url: string;
  downloadedFilename?: string;
  ariaLabel: string;
  children?: ReactNode;
}

export default function DownloadButton({
  url,
  downloadedFilename,
  ariaLabel,
  children,
}: DownloadButton) {
  return (
    <ButtonContainer>
      <RipplesButton>
        <DownloadButtonStyled
          href={url}
          download={downloadedFilename}
          aria-label={ariaLabel}
        >
          <Icon src={DownloadSvg} alt="" />
          <ButtonText>{children}</ButtonText>
        </DownloadButtonStyled>
      </RipplesButton>
    </ButtonContainer>
  );
}

const Icon = styled('img')`
  width: 1.4em;
  height: auto;
  margin-bottom: 0;
`;

const DownloadButtonStyled = styled('a')`
  ${buttonStyles}
`;

const ButtonContainer = styled('div')`
  width: 100%;
  padding: ${spacing.default} 0 0 0;
`;
