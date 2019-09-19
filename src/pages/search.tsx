import React, { useState } from 'react';
import styled from 'styled-components';
import BackgroundImage from 'gatsby-background-image';
import Layout from '../components/Layout';
import { colors, breakpoints, spacing } from '../constants';
import { graphql, useStaticQuery, Link } from 'gatsby';
import { Index } from 'elasticlunr';

const loadIndex = indexToLoad =>
  indexToLoad
    ? indexToLoad
    : // Create an elastic lunr index and hydrate with graphql query results
      Index.load(indexToLoad);

export default function SearchPage({ location }) {
  const data = useStaticQuery(searchIndexQuery);
  const index = Index.load(data.siteSearchIndex.index);
  //const [index, setIndex] = useState(null);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const search = evt => {
    if (!index) {
      console.log('Inget index');
      return;
    }
    setQuery(evt.target.value);
    const result = index
      .search(query, { expand: false })
      .map(({ ref }) => index.documentStore.getDoc(ref));

    console.log('TCL: SearchPage -> result', result);
    setResults(result);
  };

  return (
    <Layout location={location}>
      <div>
        <input type="text" value={query} onChange={search} />
        <ul>
          {results.map(page => (
            <li key={page.id}>
              <Link to={page.path}>{page.title}</Link>
              {page.tags ? ': ' + page.tags.join(`,`) : null}
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

const searchIndexQuery = graphql`
  query SearchIndexQuery {
    siteSearchIndex {
      index
    }
  }
`;
