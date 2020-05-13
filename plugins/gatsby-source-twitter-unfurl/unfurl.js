const { unfurl } = require('unfurl.js');
const { dummyTweetId } = require('../../src/dummy-tweet');

async function fetchMetadataFromLinkedSites(tweets, reporter) {
  try {
    const updatedTweetsPromises = tweets.map(async (tweet) =>
      fetchMetadataFromLinkedSite(tweet, reporter)
    );

    return Promise.all(updatedTweetsPromises);
  } catch (error) {
    reporter.warn(error);
  }
}

async function fetchMetadataFromLinkedSite(tweet, reporter) {
  try {
    const url = getEntitiesExpandedUrl(tweet);
    const linkedSite = await fetchSiteData(url, tweet, reporter).catch(
      (error) => {
        const failMessage = `Failed to fetch Twitter card or Open Graph info from ${url}`;
        reporter.warn(failMessage, error);
        return null;
      }
    );
    /*eslint require-atomic-updates: off */
    tweet.linked_site = linkedSite || null;
    return tweet;
  } catch (error) {
    reporter.warn('Failed to fetch Twitter card and Open Graph info', error);
    return tweet;
  }
}

async function fetchSiteData(url, tweet, reporter) {
  if (!url || tweet.id_str === dummyTweetId) return null;
  reporter.info(`Fetching Twitter card and Open Graph info for ${url}`);

  const siteMetadata = await unfurl(url, { oembed: false });
  if (!siteMetadata) return null;

  if (!getSiteDataTitle(siteMetadata)) return null;

  return {
    title: getSiteDataTitle(siteMetadata),
    description: getSiteDataDescription(siteMetadata),
    image: getSiteDataImage(siteMetadata),
    url: url,
  };
}

function getSiteDataTitle(siteMetadata) {
  const twitterTitle =
    siteMetadata.twitter_card && siteMetadata.twitter_card.title;
  if (twitterTitle) return twitterTitle;
  const openGraphTitle =
    siteMetadata.open_graph && siteMetadata.open_graph.title;
  return openGraphTitle || '';
}

function getSiteDataDescription(siteMetadata) {
  const twitterDescription =
    siteMetadata.twitter_card && siteMetadata.twitter_card.description;
  if (twitterDescription) return twitterDescription;
  const openGraphDescription =
    siteMetadata.open_graph && siteMetadata.open_graph.description;
  return openGraphDescription || '';
}

function getSiteDataImage(siteMetadata) {
  const twitterImage = getImage(siteMetadata.twitter_card);
  if (twitterImage) return twitterImage;
  const openGraphImage = getImage(siteMetadata.open_graph);
  return openGraphImage || '';
}

function getImage(metadata) {
  return (
    (metadata &&
      metadata.images &&
      metadata.images.length &&
      metadata.images[0].url) ||
    ''
  );
}

function getEntitiesExpandedUrl(tweet) {
  const urls =
    (tweet.entities &&
      tweet.entities.urls &&
      tweet.entities.urls.length &&
      tweet.entities.urls[0]) ||
    {};
  if (urls.expanded_url) return urls.expanded_url;

  const retweetedUrls =
    (tweet.retweeted_status &&
      tweet.retweeted_status.entities &&
      tweet.retweeted_status.entities.urls &&
      tweet.retweeted_status.entities.urls.length &&
      tweet.retweeted_status.entities.urls[0]) ||
    {};
  return retweetedUrls.expanded_url || null;
}

module.exports = { fetchMetadataFromLinkedSites };
