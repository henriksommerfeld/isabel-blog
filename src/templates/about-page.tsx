import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import { editPageUrl } from '../url-replacer';

export function AboutPageTemplate({ title, content, contentComponent }: any) {
  const PageContent = contentComponent || Content;

  return (
    <section style={{ background: 'cyan' }}>
      <div>
        <h2>{title}</h2>
        <PageContent className="content" content={content} />
      </div>
    </section>
  );
}

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
