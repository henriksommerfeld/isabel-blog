import React from 'react';
import { kebabCase } from 'lodash';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import { MarkdownRemark } from '../../auto-generated/graphql';
import styled from 'styled-components';

interface BlogPostTemplate {
  content: string;
  contentComponent: any;
  description: string;
  tags: string[];
  title: string;
  helmet: any;
}

export default function BlogPostTemplate({
  content,
  contentComponent,
  description,
  tags = [],
  title,
  helmet,
}: BlogPostTemplate) {
  const PostContent = contentComponent || Content;

  return (
    <>
      {helmet || ''}
      <ContentWidth>
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <p>{description}</p>
            <PostContent content={content} />
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map(tag => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </ContentWidth>
    </>
  );
}

const ContentWidth = styled('div')`
  width: 100%;
  max-width: 1000px;
`;
