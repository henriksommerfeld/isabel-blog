import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { spacing, buttonStyles } from '../constants';
import DownloadSvg from '../../static/img/download-filled.svg';
import { RipplesButton } from './RipplesButton';
import { ButtonText } from './ButtonText';
import Button from './Button';

interface DownloadButtonProps {
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
}: DownloadButtonProps) {
  return (
    <ButtonContainer>
      <Button
        url={url}
        downloadedFilename={downloadedFilename}
        icon={DownloadSvg}
        ariaLabel={ariaLabel}
      >
        {children}
      </Button>
    </ButtonContainer>
  );
}

const ButtonContainer = styled('div')`
  width: 100%;
  padding: ${spacing.default} 0 0 0;
`;
