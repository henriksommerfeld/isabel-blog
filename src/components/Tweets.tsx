import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import { tailwindColors } from '../tailwind-colors';
import Tweet from './Tweet';
import TwitterSvg from '../img/social/twitter-gray500.svg';
import { breakpoints, spacing, colors, fonts } from '../constants';

export default function Tweets() {
  const tweetsData = useStaticQuery<TweetsData>(isabelsTweetsQuery);
  //const tweetsData = sampleTweets;
  const tweets = tweetsData.allTwitterStatusesUserTimelineIsabel.nodes;

  return (
    <TweetsStyled>
      <Tweeter aria-label="Tweets av Isabel">
        <HeadingLink href="https://twitter.com/isommerfeld" target="_blank">
          @isommerfeld på Twitter
        </HeadingLink>
      </Tweeter>
      <TweetsInnerStyled>
        {tweets.map(tweet => (
          <Tweet key={tweet.id} tweet={tweet} />
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
  padding-top: ${spacing.paddingDefault};

  @media (min-width: ${breakpoints.medium}) {
    padding-top: ${spacing.paddingDouble};
  }
`;

const TweetsInnerStyled = styled('div')`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: ${spacing.paddingDefault};
  padding: ${spacing.paddingDefault};
  overflow-x: auto;
  word-break: break-word;

  @media (min-width: ${breakpoints.small}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${breakpoints.medium}) {
    grid-gap: ${spacing.paddingDouble};
    padding: ${spacing.paddingDouble};
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: ${breakpoints.xl}) {
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
  full_text: string;
  retweet_count: number;
  favorite_count: number;
  created_at: string;
  user: {
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
      screen_name: string;
      url: string;
      name: string;
      profile_image_url_https: string;
    };
  };
}

interface TweetsData {
  allTwitterStatusesUserTimelineIsabel: {
    nodes: TweetData[];
  };
}

const isabelsTweetsQuery = graphql`
  query {
    allTwitterStatusesUserTimelineIsabel(limit: 6) {
      nodes {
        id
        id_str
        full_text
        retweet_count
        favorite_count
        created_at
        user {
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
            expanded_url
          }
        }
        retweeted_status {
          id_str
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
            }
          }
          user {
            screen_name
            url
            name
            profile_image_url_https
          }
        }
      }
    }
  }
`;
