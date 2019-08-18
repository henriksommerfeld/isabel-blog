import React, { ReactElement } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { MarkdownRemarkConnection } from '../../auto-generated/graphql';
import BlogRollItem from './BlogRollItem';
import { Jsx } from '../../my-graphql';

interface BlogRoll {
  allMarkdownRemark: MarkdownRemarkConnection;
}

export default function BlogRoll(): ReactElement {
  const data = useStaticQuery<BlogRoll>(blogRollQuery);

  const { edges: posts } = data && data.allMarkdownRemark;

  return (
    <div className="columns is-multiline">
      {posts && posts.map(({ node: post }): Jsx => BlogRollItem(post))}
    </div>
  );
}

const blogRollQuery = graphql`
  query BlogRollQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`;
