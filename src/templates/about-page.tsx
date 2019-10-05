import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Layout from '../components/Layout';
import { HTMLContent } from '../components/Content';
import { editPageUrl } from '../url-replacer';
import { AboutPageTemplate } from './about-page-template';
import { LocationProp } from '../interfaces/LocationProp';

export default function AboutPage({ location }: LocationProp) {
  const { markdownRemark: post } = useStaticQuery(aboutPageQuery);

  return (
    <Layout location={location} editLink={editPageUrl('about')}>
      <AboutPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
        location={location}
      />
    </Layout>
  );
}

interface AboutPageData {
  data: {
    markdownRemark: {
      html: string;
      frontmatter: {
        title: string;
      };
    };
  };
}

const aboutPageQuery = graphql`
  query AboutPage {
    markdownRemark(frontmatter: { templateKey: { eq: "about-page" } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
