import React from 'react';
import Content from '../../components/Content';
import { AboutPageTemplate } from '../../templates/about-page-template';

const AboutPagePreview = ({ entry, widgetFor }) => (
  <AboutPageTemplate
    title={entry.getIn(['data', 'title'])}
    content={widgetFor('body')}
    contentComponent={Content}
  />
);

export default AboutPagePreview;
