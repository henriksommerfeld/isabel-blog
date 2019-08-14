import React from 'react';
import { kebabCase } from 'lodash';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';
import { MarkdownRemark } from '../../auto-generated/graphql';

interface BlogPostTemplate {
  content: string;
  contentComponent: any;
  description: string;
  tags: string[];
  title: string;
  helmet: any;
}

export function BlogPostTemplate({
  content,
  contentComponent,
  description,
  tags = [],
  title,
  helmet,
}: BlogPostTemplate) {
  const PostContent = contentComponent || Content;

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
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
      </div>
    </section>
  );
}

interface BlogPost {
  data: {
    markdownRemark: MarkdownRemark;
  };
}

export default function BlogPost(props: BlogPost) {
  const { markdownRemark: post } = props.data;
  const frontmatter = post.frontmatter!;
  const tags: string[] = (frontmatter!.tags || []) as string[];

  return (
    <Layout>
      <BlogPostTemplate
        content={post.html!}
        contentComponent={HTMLContent}
        description={frontmatter.description!}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${frontmatter.title}`}</title>
            <meta name="description" content={`${frontmatter.description}`} />
          </Helmet>
        }
        tags={tags}
        title={frontmatter.title!}
      />
    </Layout>
  );
}

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
      }
    }
  }
`;
