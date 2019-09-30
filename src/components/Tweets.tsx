import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import { tailwindColors } from '../tailwind-colors';
import Tweet from './Tweet';
import TwitterSvg from '../img/social/twitter-gray500.svg';
import { breakpoints, spacing, colors, fonts } from '../constants';

export default function Tweets() {
  const tweetsData = useStaticQuery<TweetsData>(isabelsTweetsQuery);
  const tweets = tweetsData.allTwitterStatusesUserTimelineIsabel.nodes;

  return (
    <TweetsStyled>
      <Tweeter aria-label="Tweets av Isabel">
        {/* <a href="https://twitter.com/isommerfeld" target="_blank"> */}
        @isommerfeld
        {/* </a> */}
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
          hashtags {
            text
          }
          user_mentions {
            screen_name
          }
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
      }
    }
  }
`;
