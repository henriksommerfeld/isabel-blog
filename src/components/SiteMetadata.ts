import { graphql, useStaticQuery } from 'gatsby';
import { SiteSiteMetadata } from '../../auto-generated/graphql';

export default function useSiteMetadata(): SiteSiteMetadata {
  const { site } = useStaticQuery(
    graphql`
      query SITE_METADATA_QUERY {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `
  );
  return site.siteMetadata;
}
