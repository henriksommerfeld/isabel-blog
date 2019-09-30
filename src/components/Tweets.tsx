import React, { useState, useEffect, useRef } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import { tailwindColors } from '../tailwind-colors';

export default function Tweets() {
  const tweetsData = useStaticQuery<TweetsData>(isabelsTweetsQuery);
  const tweets = tweetsData.allTwitterStatusesUserTimelineIsabel.nodes;

  const toRender = tweets.map(tweet => {
    return <div key={tweet.id}>{tweet.full_text}</div>;
  });

  return <TweetsStyled>{toRender}</TweetsStyled>;
}

const TweetsStyled = styled('div')`
  background-color: ${tailwindColors.green600};
`;

const sampleData = {
  data: {
    allTwitterStatusesUserTimelineIsabel: {
      nodes: [
        {
          id: 'e0d239b6ef7a21c7ff7e25481328f46b',
          id_str: '1174533019736203265',
          full_text: 'https://t.co/DM6et4kNZP',
          retweet_count: 0,
          favorite_count: 0,
          created_at: 'Thu Sep 19 03:57:48 +0000 2019',
          entities: {
            hashtags: [],
            user_mentions: [],
            urls: [
              {
                url: 'https://t.co/DM6et4kNZP',
                expanded_url:
                  'https://mitti.se/nyheter/skarholmspolisen-slar-mobbning/?omrade=skarholmen',
                display_url: 'mitti.se/nyheter/skarho…',
              },
            ],
            media: null,
          },
          user: {
            screen_name: 'isommerfeld',
            url: 'https://t.co/t0qRJl64cL',
            name: 'Isabel Sommerfeld',
          },
        },
        {
          id: '212edf55986f662c04ed113d2af31425',
          id_str: '1162427536510521344',
          full_text:
            'Började arbetsdagen igår med att göra ett Facebook-inlägg om ”dick pics”. Stå på er och polisanmäl dessa sexuella ofredanden. #polisen #brott #sexuelltofredande #metoo  https://t.co/XBFIgFMpAI',
          retweet_count: 0,
          favorite_count: 1,
          created_at: 'Fri Aug 16 18:14:56 +0000 2019',
          entities: {
            hashtags: [
              {
                text: 'polisen',
              },
              {
                text: 'brott',
              },
              {
                text: 'sexuelltofredande',
              },
              {
                text: 'metoo',
              },
            ],
            user_mentions: [],
            urls: [
              {
                url: 'https://t.co/XBFIgFMpAI',
                expanded_url:
                  'https://www.expressen.se/nyheter/polisen-isabel-32-sluta-skicka-bilder-pa-din-penis/',
                display_url: 'expressen.se/nyheter/polise…',
              },
            ],
            media: null,
          },
          user: {
            screen_name: 'isommerfeld',
            url: 'https://t.co/t0qRJl64cL',
            name: 'Isabel Sommerfeld',
          },
        },
        {
          id: 'e85f61b1f5109f2b2cd2192cf89a37f6',
          id_str: '1162016496748564480',
          full_text:
            'Polisutredaren: ”Vi är trötta på att behöva se era dickpics” https://t.co/Q67rgiTnHH',
          retweet_count: 0,
          favorite_count: 0,
          created_at: 'Thu Aug 15 15:01:36 +0000 2019',
          entities: {
            hashtags: [],
            user_mentions: [],
            urls: [
              {
                url: 'https://t.co/Q67rgiTnHH',
                expanded_url:
                  'https://mitti.se/nyheter/polisutredaren-trotta-dickpics/?omrade=skarholmen#.XVVzsNBV0l0.twitter',
                display_url: 'mitti.se/nyheter/polisu…',
              },
            ],
            media: null,
          },
          user: {
            screen_name: 'isommerfeld',
            url: 'https://t.co/t0qRJl64cL',
            name: 'Isabel Sommerfeld',
          },
        },
        {
          id: '7bb8ce57af02965dc487e3c30e28a051',
          id_str: '1155209781168214017',
          full_text:
            'RT @broughtfromheII: Hela det här ASAP Rocky dramat kommer sluta med att USA invaderar Schweiz',
          retweet_count: 1683,
          favorite_count: 0,
          created_at: 'Sat Jul 27 20:14:09 +0000 2019',
          entities: {
            hashtags: [],
            user_mentions: [
              {
                screen_name: 'broughtfromheII',
              },
            ],
            urls: [],
            media: null,
          },
          user: {
            screen_name: 'isommerfeld',
            url: 'https://t.co/t0qRJl64cL',
            name: 'Isabel Sommerfeld',
          },
        },
        {
          id: 'ff0646c3ddaec8114883f6177b6b8d21',
          id_str: '1155207847774425095',
          full_text:
            'RT @ahamrud: Hon var hatets måltavla – nu är hon död https://t.co/uOcREU5n1K via @SvD',
          retweet_count: 19,
          favorite_count: 0,
          created_at: 'Sat Jul 27 20:06:28 +0000 2019',
          entities: {
            hashtags: [],
            user_mentions: [
              {
                screen_name: 'ahamrud',
              },
              {
                screen_name: 'SvD',
              },
            ],
            urls: [
              {
                url: 'https://t.co/uOcREU5n1K',
                expanded_url:
                  'https://www.svd.se/hon-var-hatets-maltavla--nu-ar-hon-dod',
                display_url: 'svd.se/hon-var-hatets…',
              },
            ],
            media: null,
          },
          user: {
            screen_name: 'isommerfeld',
            url: 'https://t.co/t0qRJl64cL',
            name: 'Isabel Sommerfeld',
          },
        },
      ],
    },
  },
};

interface TweetData {
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
    allTwitterStatusesUserTimelineIsabel(limit: 5) {
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
