import React from 'react';
import BlogPostTemplate from '../../templates/blog-post-template';

const BlogPostPreview = ({ entry, widgetFor }) => {
  const date = entry.getIn(['data', 'date']);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('sv', options);

  return (
    <BlogPostTemplate
      content={widgetFor('body')}
      date={formattedDate}
      tags={entry.getIn(['data', 'tags'])}
      title={entry.getIn(['data', 'title'])}
    />
  );
};

export default BlogPostPreview;
