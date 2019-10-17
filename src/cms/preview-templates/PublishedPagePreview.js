import React from 'react'
import Content from '../../components/Content'
import { toJsSafe } from '../toJsSafe'
import { PublishedPageTemplate } from '../../templates/published-page-template'

const PublishedPagePreview = ({ entry, widgetFor }) => {
  const dataRaw = entry.getIn(['data'])
  const data = toJsSafe(dataRaw)

  if (!data) return <div>Loading...</div>

  return (
    <PublishedPageTemplate
      content={widgetFor('body')}
      contentComponent={Content}
    />
  )
}

export default PublishedPagePreview
