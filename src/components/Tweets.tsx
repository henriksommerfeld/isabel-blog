import React, { useState, useEffect, useRef } from 'react';
import { graphql, useStaticQuery } from 'gatsby';

export default function Tweets() {
  return null;
}

const sampleData = {
  data: {
    allTwitterStatusesUserTimelineIsabel: {
      nodes: [
        {
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
        },
        {
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
        },
        {
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
        },
        {
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
        },
        {
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
        },
      ],
    },
  },
};

const isabelsTweetsQuery = graphql`
  query {
    allTwitterStatusesUserTimelineIsabel(limit: 5) {
      nodes {
        full_text
        retweet_count
        favorite_count
        created_at
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
            display_url
          }
          media {
            media_url_https
            url
            display_url
            expanded_url
          }
        }
      }
    }
  }
`;
