import React from 'react';
import styled from 'styled-components';
import BackgroundImage from 'gatsby-background-image';
import Layout from '../components/Layout';
import { colors, breakpoints, spacing } from '../constants';
import { graphql, useStaticQuery } from 'gatsby';

export default function NotFoundPage({ location }) {
  const data = useStaticQuery(backgroundImageQuery);
  const fluidImage = getImageFrom(data);

  return (
    <Layout location={location}>
      <Page
        fluid={fluidImage}
        backgroundColor={darkGreen}
        Tag="div"
        className="lost-background"
      >
        <Text>
          <h1>Gått vilse?</h1>
          <Description>
            Det finns inget på den här adressen, men använd menyn så hittar du
            säkert rätt.
          </Description>
        </Text>
      </Page>
    </Layout>
  );
}

function getImageFrom(data) {
  if (
    !data ||
    !data.fileName ||
    !data.fileName.childImageSharp ||
    !data.fileName.childImageSharp.fluid
  )
    return null;

  return data.fileName.childImageSharp.fluid;
}

const darkGreen = '#062c21';

const backgroundImageQuery = graphql`
  query {
    fileName: file(
      relativePath: { eq: "hidden/martin-reisch-pEb-Xf_qM0s-unsplash.jpg" }
    ) {
      childImageSharp {
        fluid(maxWidth: 5000, maxHeight: 3000) {
          src
          srcSet
          aspectRatio
          sizes
          base64
        }
      }
    }
  }
`;

const Description = styled('p')`
  font-size: 1.2rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
`;

const Text = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${spacing.paddingDouble} ${spacing.paddingDefault};
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.5) 60%,
    rgba(0, 0, 0, 0) 100%
  );

  @media (min-width: ${breakpoints.small}) {
    padding: ${spacing.paddingDouble};

    h1 {
      font-size: 2rem;
      text-shadow: 0 0 2px rgba(0, 0, 0, 0.5), 0 0 30px rgba(255, 255, 255, 0.7);
    }

    p {
      font-size: 1.5rem;
      text-shadow: 0 0 2px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 255, 255, 0.7);
    }
  }

  @media (min-width: ${breakpoints.medium}) {
    padding: ${spacing.notFoundBannerExtraPadding};

    h1 {
      font-size: 2.5rem;
      text-shadow: 0 0 2px rgba(0, 0, 0, 0.5), 0 0 30px rgba(255, 255, 255, 0.7);
    }

    p {
      font-size: 2rem;
      text-shadow: 0 0 2px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 255, 255, 0.7);
    }
  }

  @media (min-width: ${breakpoints.large}) {
    h1 {
      font-size: 3rem;
      text-shadow: 0 0 2px rgba(0, 0, 0, 0.5), 0 0 50px rgba(255, 255, 255, 0.7);
    }

    p {
      font-size: 2.5rem;
      text-shadow: 0 0 2px rgba(0, 0, 0, 0.5), 0 0 30px rgba(255, 255, 255, 0.7);
    }
  }
`;

const Page = styled(BackgroundImage)`
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 80px);
  color: ${colors.white};
  background-color: ${darkGreen};

  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position-y: center;
  background-position-x: 25%;
  background-size: cover;

  @media (min-width: ${breakpoints.large}) {
    background-position-y: 75%;
  }
`;
