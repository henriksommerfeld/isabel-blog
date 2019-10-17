import React from 'react'
import Content from '../../components/Content'
import { AboutPageTemplate } from '../../templates/about-page-template'
import { toJsSafe } from '../toJsSafe'

const AboutPagePreview = ({ entry, widgetFor }) => {
  const dataRaw = entry.getIn(['data'])
  const data = toJsSafe(dataRaw)

  if (!data) return <div>Loading...</div>

  return (
    <AboutPageTemplate
      content={widgetFor('body')}
      contentComponent={Content}
      portraitImageFile={data.image}
    />
  )
}

export default AboutPagePreview
