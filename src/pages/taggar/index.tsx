import React from 'react';
import Helmet from 'react-helmet';
import { Link, graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import Layout from '../../components/Layout';
import useSiteMetadata from '../../components/SiteMetadata';
import { TagsTemplate } from '../../templates/tags-template';
import tagSvg from '../../../static/img/tag-grey500.svg';
import { getTagRouteUrl } from '../../tags-parser';
import { WindowLocation } from '@reach/router';

interface TagsPageProps {
  location: WindowLocation;
}

export default function TagsPage({ location }: TagsPageProps) {
  const data = useStaticQuery(tagPageQuery);
  const group = data.allMarkdownRemark.group;
  const { title } = useSiteMetadata();

  return (
    <Layout location={location}>
      <Helmet title={`Taggar | ${title}`} />
      <TagsTemplate location={location}>
        <h1>Taggar</h1>
        <ul className="taglist">
          {group.map(tag => (
            <LinkContainer key={tag.fieldValue}>
              <LinkIconSvg src={tagSvg} alt="" />
              <Link to={getTagRouteUrl(tag.fieldValue)}>
                {tag.fieldValue} ({tag.totalCount})
              </Link>
            </LinkContainer>
          ))}
        </ul>
      </TagsTemplate>
    </Layout>
  );
}

const LinkIconSvg = styled('img')`
  margin: 0 0.5em 0 0;
  min-width: 1rem;
`;

const LinkContainer = styled('li')`
  display: flex;
  align-items: center;
`;

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
