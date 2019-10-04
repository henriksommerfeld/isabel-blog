require('source-map-support').install();

const Twitter = require(`twitter`);
const fetchTweets = require(`./twitter`);
const { fetchMetadataFromLinkedSites } = require('./unfurl');
const { md5, camelCase } = require(`./utils`);
const { saveResult } = require(`./debug`);
const { dummyTweet } = require('../../src/dummy-tweet');

const nodeTypes = [];
const DEBUG = process.env.DEBUG === `true`;

function generateNode(tweet, contentDigest, type) {
  const id = md5(tweet.id_str || tweet.toString());
  const nodeData = {
    id: id,
    children: [],
    parent: `__SOURCE__`,
    internal: {
      type,
      contentDigest,
    },
  };

  if (tweet && tweet.place && tweet.place.bounding_box) {
    delete tweet.place.bounding_box;
    tweet.place.bounding_box = null;
  }

  const node = Object.assign({}, tweet, nodeData);
  return node;
}

function createNodes(tweets, nodeType, actions, createContentDigest) {
  const { createNode } = actions;
  tweets.forEach(tweet => {
    createNode(generateNode(tweet, createContentDigest(tweet), nodeType));
  });
}

function hasCredentials(credentials) {
  return (
    credentials &&
    credentials.consumer_key &&
    credentials.consumer_secret &&
    credentials.bearer_token
  );
}

async function getTweets(query, credentials, reporter) {
  const nodeType = camelCase(`twitter ${query.endpoint}`);

  let results = [];

  if (!hasCredentials(credentials)) {
    reporter.warn(
      `Twitter keys in .env file missing, only creating dummy tweet.`
    );
  } else {
    const twitterClient = new Twitter(credentials);
    results = await fetchTweets(twitterClient, query, reporter);
  }

  const resultsWithDummy = [dummyTweet, ...results];
  nodeTypes.push(nodeType);

  return {
    nodeType,
    results: resultsWithDummy,
  };
}

function createNodesForTweets(
  queryResults,
  actions,
  createContentDigest,
  reporter
) {
  const { results, nodeType } = queryResults;

  if (DEBUG === true) {
    saveResult('', results);
  }

  if (results.length) {
    reporter.info(`Creating Twitter nodes ${nodeType} ...`);
    createNodes(results, nodeType, actions, createContentDigest);
  } else {
    reporter.warn(`No twitter results from query, only creating dummy tweet.`);
  }
}

exports.sourceNodes = async (
  { actions, createContentDigest, reporter },
  { query, credentials }
) => {
  if (!query) {
    reporter.warn(`No Twitter query found. Please check your configuration`);
    return Promise.resolve();
  }

  const tweetsQueryResult = await getTweets(query, credentials, reporter);

  const enrichedTweets = await fetchMetadataFromLinkedSites(
    tweetsQueryResult.results,
    reporter
  );

  if (enrichedTweets) tweetsQueryResult.results = enrichedTweets;

  createNodesForTweets(
    tweetsQueryResult,
    actions,
    createContentDigest,
    reporter
  );

  return Promise.resolve();
};
