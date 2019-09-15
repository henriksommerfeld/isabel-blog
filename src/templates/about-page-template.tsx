import React from 'react';

export function AboutPageTemplate({ title, content, contentComponent }: any) {
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
