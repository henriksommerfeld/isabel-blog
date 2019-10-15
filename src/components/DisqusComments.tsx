import React from 'react';
import { Disqus } from 'gatsby-plugin-disqus';
import { urls } from '../constants';
import { CommentsProps } from './Comments';

export default function DisqusComments({ postTitle, location }: CommentsProps) {
  const disqusConfig = {
    url: `${urls.siteBaseUrl + location.pathname}`,
    identifier: location.pathname,
    title: postTitle,
  };
  return (
    <>
      <h2>Kommentarer</h2>
      <Disqus config={disqusConfig} />
    </>
  );
}
