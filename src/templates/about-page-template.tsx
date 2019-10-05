import React from 'react';
import { WindowLocation } from '@reach/router';

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
    <section style={{ background: 'cyan' }}>
      <div>
        <h2>{title}</h2>
        <PageContent className="content" content={content} />
      </div>
    </section>
  );
}
