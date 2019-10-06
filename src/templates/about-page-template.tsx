import React from 'react';
import { WindowLocation } from '@reach/router';
import { PageStyled } from './page-styled';

interface AboutPageTemplateProps {
  title: string;
  content: any;
  contentComponent: any;
  location: WindowLocation;
}

export function AboutPageTemplate({
  title,
  content,
  contentComponent,
}: AboutPageTemplateProps) {
  const PageContent = contentComponent;

  return (
    <PageStyled style={{ background: 'cyan' }}>
      <div>
        <h2>{title}</h2>
        <PageContent className="content" content={content} />
      </div>
    </PageStyled>
  );
}
