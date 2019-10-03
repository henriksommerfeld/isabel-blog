const Twitter = require(`twitter`);
const getTweets = require(`./twitter`);
const { md5, camelCase } = require(`./utils`);
const { saveResult } = require(`./debug`);
const dummyTweet = require('./dummy-tweet.json');

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

function createNodes(
  tweets,
  nodeType,
  boundActionCreators,
  createContentDigest
) {
  const { createNode } = boundActionCreators;
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

exports.sourceNodes = async (
  { boundActionCreators, createContentDigest, reporter },
  { queries, credentials }
) => {
  if (queries) {
    return Promise.all(
      Object.keys(queries)
        .map(async queryName => {
          const nodeType = camelCase(
            `twitter ${queries[queryName].endpoint} ${queryName}`
          );

          let results = [];

          if (!hasCredentials(credentials)) {
            reporter.warn(
              `Twitter keys in .env file missing, only creating dummy tweet.`
            );
          } else {
            reporter.warn(`credentials: `, credentials);
            const twitterClient = new Twitter(credentials);
            results = await getTweets(
              twitterClient,
              queries[queryName],
              reporter
            );
          }

          const resultsWithDummy = [dummyTweet, ...results];
          nodeTypes.push(nodeType);

          return {
            queryName,
            nodeType,
            results: resultsWithDummy,
          };
        })
        .map(async queryResults => {
          const { queryName, results, nodeType } = await queryResults;

          if (DEBUG === true) {
            saveResult(queryName, results);
          }

          if (results.length) {
            reporter.info(`Creating Twitter nodes ${nodeType} ...`);
          } else {
            reporter.warn(
              `No twitter results from ${queryName}, only creating dummy tweet.`
            );
          }
          createNodes(
            results,
            nodeType,
            boundActionCreators,
            createContentDigest
          );
        })
    );
  } else {
    reporter.warn(`No Twitter query found. Please check your configuration`);
  }

  return Promise.resolve();
};
