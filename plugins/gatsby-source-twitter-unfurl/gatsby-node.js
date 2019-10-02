const Twitter = require(`twitter`);
const getTweets = require(`./twitter`);
const { md5, camelCase } = require(`./utils`);
const { saveResult } = require(`./debug`);

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

exports.sourceNodes = async (
  { boundActionCreators, createContentDigest, reporter },
  { queries, credentials }
) => {
  const { createNode } = boundActionCreators;

  function createNodes(tweets, nodeType) {
    tweets.forEach(tweet => {
      createNode(generateNode(tweet, createContentDigest(tweet), nodeType));
    });
  }

  if (queries) {
    var client = new Twitter(credentials);
    return Promise.all(
      Object.keys(queries)
        .map(async queryName => {
          const nodeType = camelCase(
            `twitter ${queries[queryName].endpoint} ${queryName}`
          );
          const results = await getTweets(client, queries[queryName], reporter);
          nodeTypes.push(nodeType);
          return {
            queryName,
            nodeType,
            results,
          };
        })
        .map(async queryResults => {
          const { queryName, results, nodeType } = await queryResults;

          if (DEBUG === true) {
            saveResult(queryName, results);
          }

          if (results.length) {
            reporter.info(`Creating Twitter nodes ${nodeType} ...`);
            createNodes(results, nodeType);
          } else {
            reporter.warn(`No twitter results from ${queryName}`);
          }
        })
    );
  } else {
    reporter.warn(`No Twitter query found. Please check your configuration`);
  }

  return Promise.resolve();
};
