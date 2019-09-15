import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Layout from '../components/Layout';
import { HTMLContent } from '../components/Content';
import { editPageUrl } from '../url-replacer';
import { AboutPageTemplate } from './about-page-template';

export default function AboutPage({ location }: AboutPageData) {
  const { markdownRemark: post } = useStaticQuery(aboutPageQuery);

  return (
    <Layout location={location} editLink={editPageUrl('about')}>
      <AboutPageTemplate
        contentComponent={HTMLContent}
        title={post.frontmatter.title}
        content={post.html}
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
  location: any;
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
