import React from 'react';
import Content from '../../components/Content';
import { AboutPageTemplate } from '../../templates/about-page-template';

const AboutPagePreview = ({ entry, widgetFor }) => {
  const data = entry.getIn(['data']).toJS();

  if (!data) return <div>Loading...</div>;

  return (
    <AboutPageTemplate
      title={entry.getIn(['data', 'title'])}
      content={widgetFor('body')}
      contentComponent={Content}
      portraitImageFile={data.image}
    />
  );
};

export default AboutPagePreview;
