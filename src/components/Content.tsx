import React, { ReactElement } from 'react';

interface Content {
  content: string;
}

export default function Content({ content }: Content): ReactElement {
  return <div>{content}</div>;
}

export function HTMLContent({ content }: Content): ReactElement {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}
