import { graphql, useStaticQuery } from 'gatsby';
import { SiteSiteMetadata } from '../../auto-generated/graphql';

export default function useSiteMetadata(): SiteSiteMetadata {
  const data = useStaticQuery(metadataQuery);
  const metadata = data.markdownRemark.frontmatter;
  return { title: metadata.heading, description: metadata.description };
}

const metadataQuery = graphql`
  query SiteMetadataQuery {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        heading
        description
      }
    }
  }
`;
