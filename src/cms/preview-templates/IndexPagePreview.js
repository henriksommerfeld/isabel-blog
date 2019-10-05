import React from 'react';
import { IndexPageTemplate } from '../../templates/index-page-template';

const IndexPagePreview = ({ entry, widgetFor }) => {
  const data = entry.getIn(['data']).toJS();

  if (!data) return <div>Loading...</div>;

  return (
    <IndexPageTemplate
      image={data.image}
      heading={data.heading}
      subheading={data.subheading}
      description={widgetFor('body')}
      isPreview={true}
    />
  );
};

export default IndexPagePreview;
