import React from 'react';
import { kebabCase } from 'lodash';
import Helmet from 'react-helmet';
import { Link, graphql, useStaticQuery } from 'gatsby';
import Layout from '../../components/Layout';
import useSiteMetadata from '../../components/SiteMetadata';
import { TagsTemplate } from '../../templates/tags-template';

export default function TagsPage({ location }) {
  const data = useStaticQuery(tagPageQuery);
  const { title } = useSiteMetadata();
  const group = data.allMarkdownRemark.group;

  return (
    <Layout location={location}>
      <Helmet title={`Taggar | ${title}`} />
      <TagsTemplate>
        <h1>Taggar</h1>
        <ul className="taglist">
          {group.map(tag => (
            <li key={tag.fieldValue}>
              <Link to={`/taggar/${kebabCase(tag.fieldValue)}/`}>
                {tag.fieldValue} ({tag.totalCount})
              </Link>
            </li>
          ))}
        </ul>
      </TagsTemplate>
    </Layout>
  );
}

const tagPageQuery = graphql`
  query TagsQuery {
    allMarkdownRemark(
      limit: 1000
      filter: { frontmatter: { hidden: { ne: true } } }
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;
