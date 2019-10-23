import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import { tailwindColors } from '../tailwind-colors';
import Tweet from './Tweet';
import { dummyTweetId } from '../dummy-tweet';
import TwitterSvg from '../img/social/twitter-gray500.svg';
import { breakpoints, spacing, colors, fonts, urls } from '../constants';
import { GatsbyImageProps } from 'gatsby-image';

export default function Tweets() {
  const tweetsData = useStaticQuery<TweetsData>(isabelsTweetsQuery);
  const tweets = tweetsData.allTwitterStatusesUserTimeline.nodes;
  const images = tweetsData.allFile.nodes;
  /* The local plugin 'gatsby-source-twitter-unfurl' always returns the referenced
     dummy tweet, that has all the possible properties that can be returned 
     from the GraphQL query. This is to avoid that the query fails, and thus the 
     entire build because none of the returned tweets have a property I'm querying 
     for.
  */
  const realTweets = tweets.filter(x => x.id_str !== dummyTweetId && x.id_str);

  if (!realTweets.length) return null;

  return (
    <TweetsStyled>
      <Tweeter>
        <HeadingLink
          href={`${urls.twitterBaseUrl}/isommerfeld`}
          target="_blank"
          rel="noopener noreferrer"
        >
          @isommerfeld på Twitter
        </HeadingLink>
      </Tweeter>
      <TweetsInnerStyled>
        {realTweets.map(tweet => (
          <Tweet key={tweet.id} tweet={tweet} images={images} />
        ))}
      </TweetsInnerStyled>
    </TweetsStyled>
  );
}

const Tweeter = styled('div')`
  text-align: center;
  color: ${colors.white};
  font-family: ${fonts.headingFamily};
  font-size: 1.4rem;
  text-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2);
`;

const TweetsStyled = styled('section')`
  background-color: ${tailwindColors.gray700};
  background-image: url(${TwitterSvg});
  background-size: contain;
  background-repeat: no-repeat;
  background-position-x: 25%;
  background-position-y: center;
  padding-top: ${spacing.default};

  @media (min-width: ${breakpoints.medium}) {
    padding-top: ${spacing.double};
  }
`;

const TweetsInnerStyled = styled('div')`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: ${spacing.default};
  padding: ${spacing.default};
  overflow-x: auto;
  word-break: break-word;

  @media (min-width: ${breakpoints.small}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${breakpoints.large}) {
    grid-gap: ${spacing.double};
    padding: ${spacing.double};
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 3000px) {
    grid-template-columns: repeat(6, 1fr);
  }
`;

const HeadingLink = styled('a')`
  transition: color, text-shadow, background 200ms ease-out, outline 60ms;
  display: inline;
  background: linear-gradient(
    to right,
    ${tailwindColors.red800} 0%,
    ${tailwindColors.red500} 50%,
    ${tailwindColors.red800} 100%
  );
  background-position-x: center;
  background-position-y: bottom;
  background-repeat: repeat;
  background-size: 0px 3px;
  background-repeat: no-repeat;
  padding-bottom: 5px;

  &,
  &:visited {
    color: ${colors.white};
    text-shadow: 0px 3px 5px rgba(0, 0, 0, 0.2);
  }

  &:hover {
    color: ${colors.white};
    text-shadow: 0 0 2px rgba(0, 0, 0, 0.5), 0 0 30px white;
    background-size: 100% 3px;
  }
`;

export interface TweetData {
  id: string;
  id_str: string;
  text: string;
  full_text: string;
  retweet_count: number;
  favorite_count: number;
  created_at: string;
  user: {
    id: number;
    screen_name: string;
    url: string;
    name: string;
    profile_image_url_https: string;
  };
  entities?: {
    hashtags: {
      text: string;
    };
    user_mentions?: {
      screen_name: string;
    };
    urls?: {
      url: string;
      expanded_url: string;
    };
    media?: {
      media_url_https: string;
      url: string;
      expanded_url: string;
    };
  };
  retweeted_status?: {
    id: string;
    id_str: string;
    text: string;
    full_text: string;
    retweet_count: number;
    favorite_count: number;
    created_at: string;
    entities?: {
      hashtags: {
        text: string;
      };
      user_mentions?: {
        screen_name: string;
      };
      urls?: {
        url: string;
        expanded_url: string;
      };
      media?: {
        media_url_https: string;
        url: string;
        expanded_url: string;
      };
    };
    user: {
      id: number;
      screen_name: string;
      url: string;
      name: string;
      profile_image_url_https: string;
    };
  };
  linked_site?: {
    title: string;
    description: string;
    image: string;
    url: string;
  };
}

interface TweetsData {
  allTwitterStatusesUserTimeline: {
    nodes: TweetData[];
  };
  allFile: {
    nodes: TwitterImage[];
  };
}

export interface TwitterImage {
  name: string;
  ext: string;
  publicURL: string;
  childImageSharp: GatsbyImageProps | null;
}

const isabelsTweetsQuery = graphql`
  query {
    allTwitterStatusesUserTimeline(limit: 7) {
      nodes {
        id
        id_str
        text
        full_text
        retweet_count
        favorite_count
        created_at
        user {
          id
          screen_name
          url
          name
          profile_image_url_https
        }
        entities {
          urls {
            url
            expanded_url
          }
          media {
            media_url_https
            url
            type
          }
        }
        retweeted_status {
          id_str
          text
          full_text
          retweet_count
          favorite_count
          created_at
          entities {
            urls {
              url
              expanded_url
            }
            media {
              media_url_https
              url
              type
            }
          }
          user {
            id
            screen_name
            url
            name
            profile_image_url_https
          }
        }
        linked_site {
          title
          description
          image
          url
        }
      }
    }
    allFile(filter: { relativeDirectory: { eq: "twitter" } }) {
      nodes {
        name
        ext
        publicURL
        childImageSharp {
          fluid(maxWidth: 1000) {
            src
            srcSet
            aspectRatio
            sizes
            base64
          }
        }
      }
    }
  }
`;
