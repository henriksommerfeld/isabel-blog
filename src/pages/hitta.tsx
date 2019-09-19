import React, { useState } from 'react';
import styled from 'styled-components';
import BackgroundImage from 'gatsby-background-image';
import Layout from '../components/Layout';
import { colors, breakpoints, spacing } from '../constants';
import { graphql, useStaticQuery, Link } from 'gatsby';
import { Index } from 'elasticlunr';

export default function SearchPage({ location }) {
  const data = useStaticQuery(searchIndexQuery);
  const index = Index.load(data.siteSearchIndex.index);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const search = evt => {
    const newQuery = evt.target.value;
    setQuery(newQuery);

    if (!index || !index.search) {
      console.log('Inget index');
      return;
    }
    const result = index
      .search(newQuery, { expand: true })
      .map(({ ref }) => index.documentStore.getDoc(ref));

    console.log('TCL: SearchPage -> result', result);
    setResults(result);
  };

  const onBlur = evt => {
    console.log(query);
    // save
  };

  return (
    <Layout location={location}>
      <div>
        <input type="search" value={query} onChange={search} onBlur={onBlur} />
        <ul>
          {results.map(page => (
            <li key={page.id}>
              <Link to={page.path}>{page.title}</Link>
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
