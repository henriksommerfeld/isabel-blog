import React from 'react';
import Content from '../../components/Content';
import { CookiesPageTemplate } from '../../templates/cookies-page-template';

const CookiesPagePreview = ({ entry, widgetFor }) => {
  const data = entry.getIn(['data']).toJS();

  if (!data) return <div>Loading...</div>;

  return (
    <CookiesPageTemplate
      content={widgetFor('body')}
      contentComponent={Content}
    />
  );
};

export default CookiesPagePreview;
