import React from 'react';

interface Content {
  content: string;
}

export const HTMLContent = ({ content }: Content) => (
  <div dangerouslySetInnerHTML={{ __html: content! }} />
);

const Content = ({ content }: Content) => <div>{content}</div>;

export default Content;
