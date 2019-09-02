import React from 'react';
import { IndexPageTemplate } from '../../templates/index-page';

const IndexPagePreview = ({ entry, widgetFor }) => {
  const data = entry.getIn(['data']).toJS();

  if (!data) return <div>Loading...</div>;

  const imageInfo = {image: data.image};
  
  return (
    <IndexPageTemplate
      image={imageInfo}
      heading={data.heading}
      subheading={data.subheading}
      description={widgetFor('body')}
      isPreview={true}
    />
  );  
};

export default IndexPagePreview;
