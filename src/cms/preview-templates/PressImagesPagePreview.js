import React from 'react';
import Content from '../../components/Content';
import { PressImagesPageTemplate } from '../../templates/pressimages-page-template';

const PressImagesPagePreview = ({ entry, widgetFor }) => {
  const data = entry.getIn(['data']).toJS();

  if (!data) return <div>Loading...</div>;

  const images = data.downloadableimages;

  return (
    <PressImagesPageTemplate
      content={widgetFor('body')}
      contentComponent={Content}
      pressImages={images}
      isPreview={true}
    />
  );
};

export default PressImagesPagePreview;
