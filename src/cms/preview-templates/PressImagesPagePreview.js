import React from 'react'
import Content from '../../components/Content'
import { toJsSafe } from '../toJsSafe'
import { PressImagesPageTemplate } from '../../templates/pressimages-page-template'

const PressImagesPagePreview = ({ entry, widgetFor }) => {
  const dataRaw = entry.getIn(['data'])
  const data = toJsSafe(dataRaw)

  if (!data) return <div>Loading...</div>

  const images = data.downloadableimages

  return (
    <PressImagesPageTemplate
      content={widgetFor('body')}
      contentComponent={Content}
      pressImages={images}
      isPreview={true}
    />
  )
}

export default PressImagesPagePreview
