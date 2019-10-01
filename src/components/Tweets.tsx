import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import { tailwindColors } from '../tailwind-colors';
import Tweet from './Tweet';
import TwitterSvg from '../img/social/twitter-gray500.svg';
import { breakpoints, spacing, colors, fonts } from '../constants';

export default function Tweets() {
  //const tweetsData = useStaticQuery<TweetsData>(isabelsTweetsQuery);
  const tweetsData = sampleTweets;
  const tweets = tweetsData.allTwitterStatusesUserTimelineIsabel.nodes;

  return (
    <TweetsStyled>
      <Tweeter aria-label="Tweets av Isabel">
        {/* <a href="https://twitter.com/isommerfeld" target="_blank"> */}
        @isommerfeld på Twitter
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

// const isabelsTweetsQuery = graphql`
//   query {
//     allTwitterStatusesUserTimelineIsabel(limit: 6) {
//       nodes {
//         id
//         id_str
//         full_text
//         retweet_count
//         favorite_count
//         created_at
//         user {
//           screen_name
//           url
//           name
//           profile_image_url_https
//         }
//         entities {
//           hashtags {
//             text
//           }
//           user_mentions {
//             screen_name
//           }
//           urls {
//             url
//             expanded_url
//           }
//           media {
//             media_url_https
//             url
//             expanded_url
//           }
//         }
//       }
//     }
//   }
// `;

const sampleTweets = {
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
          profile_image_url_https:
            'https://pbs.twimg.com/profile_images/1162428772601204737/Oh96SfQW_normal.jpg',
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
          profile_image_url_https:
            'https://pbs.twimg.com/profile_images/1162428772601204737/Oh96SfQW_normal.jpg',
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
          profile_image_url_https:
            'https://pbs.twimg.com/profile_images/1162428772601204737/Oh96SfQW_normal.jpg',
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
          profile_image_url_https:
            'https://pbs.twimg.com/profile_images/1162428772601204737/Oh96SfQW_normal.jpg',
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
          profile_image_url_https:
            'https://pbs.twimg.com/profile_images/1162428772601204737/Oh96SfQW_normal.jpg',
        },
      },
    ],
  },
};
