import React from 'react';
import { PublishedPageTemplate } from '../../templates/published-page-template';

const PublishedPagePreview = ({ entry, widgetFor }) => {
  const data = entry.getIn(['data']).toJS();

  if (!data) return <div>Loading...</div>;

  return (
    <PublishedPageTemplate
      image={data.image}
      title={data.title}
      content={widgetFor('body')}
    />
  );
};

export default PublishedPagePreview;
