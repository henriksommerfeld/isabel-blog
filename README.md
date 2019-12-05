# Isabel Sommerfeld's Blog

[![Actions Status](https://github.com/henriksommerfeld/isabel-blog/workflows/Blog%20tests/badge.svg)](https://github.com/henriksommerfeld/isabel-blog/actions)
[![Netlify Status](https://api.netlify.com/api/v1/badges/b3ba54d2-595b-412a-b3c5-a30c55aaacc9/deploy-status)](https://app.netlify.com/sites/isabelsommerfeld/deploys)

This is the personal blog of Isabel Sommerfeld based on [GatsbyJS][1] available at <https://www.isabelsommerfeld.com>. The content is mostly in Swedish, so even if the code is generally in English, there are some hard-coded texts and filenamnes in Swedish.

## Installation

`yarn install`

## Run

`yarn start`

## Unit tests

`yarn test:unit`

## Integration tests

`yarn test:cypress:ci`

[1]: https://www.gatsbyjs.org/

## Twitter Feed

To fetch and show tweets you have to create a `.env` file with the following keys and of course, add the actual values:

```
TWITTER_CONSUMER_KEY=
TWITTER_SECRET=
TWITTER_BEARER_TOKEN=
```
