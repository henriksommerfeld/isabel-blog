import React from 'react';
import Content from '../../components/Content';
import { PublishedPageTemplate } from '../../templates/published-page-template';

const PublishedPagePreview = ({ entry, widgetFor }) => {
  const data = entry.getIn(['data']).toJS();

  if (!data) return <div>Loading...</div>;

  return (
    <PublishedPageTemplate
      imageFile={data.image}
      title={data.title}
      content={widgetFor('body')}
      contentComponent={Content}
    />
  );
};

export default PublishedPagePreview;
