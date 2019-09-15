import React from 'react';
import Content from '../components/Content';

export function AboutPageTemplate({ title, content, contentComponent }: any) {
  const PageContent = contentComponent || Content;

  return (
    <section style={{ background: 'cyan' }}>
      <div>
        <h2>{title}</h2>
        <PageContent className="content" content={content} />
      </div>
    </section>
  );
}
