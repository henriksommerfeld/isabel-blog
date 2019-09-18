import React from 'react';
import styled from 'styled-components';
import { spacing, buttonStyles } from '../constants';
import DownloadSvg from '../../static/img/download.svg';
import { RipplesButton } from './RipplesButton';
import { ButtonText } from './ButtonText';

interface DownloadButton {
  url: string;
  downloadedFilename?: string;
  children?: any;
}

export default function DownloadButton({
  url,
  downloadedFilename,
  children,
}: DownloadButton) {
  return (
    <ButtonContainer>
      <RipplesButton>
        <DownloadButtonStyled href={url} download={downloadedFilename}>
          <Icon src={DownloadSvg} />
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
  padding: ${spacing.paddingDefault} 0 0 0;
`;
