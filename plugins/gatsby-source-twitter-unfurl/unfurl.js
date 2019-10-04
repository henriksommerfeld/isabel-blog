const { unfurl } = require('unfurl.js');
const { dummyTweetId } = require('../../src/dummy-tweet');

async function fetchMetadataFromLinkedSites(tweets, reporter) {
  try {
    const updatedTweetsPromises = tweets.map(async tweet =>
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
      error => {
        const failMessage = `Failed to fetch Twitter card or Open Graph info from ${url}`;
        reporter.warn(failMessage, error);
        return null;
      }
    );
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

  const siteData = siteMetadata.twitter_card || siteMetadata.open_graph || null;

  if (!siteData) return null;

  return {
    title: siteData.title,
    description: siteData.description,
    image:
      (siteData.images && siteData.images.length && siteData.images[0].url) ||
      '',
  };
}

function getEntitiesExpandedUrl(tweet) {
  const urls =
    (tweet.entities &&
      tweet.entities.urls &&
      tweet.entities.urls.length &&
      tweet.entities.urls[0]) ||
    {};
  return urls.expanded_url || null;
}

module.exports = { fetchMetadataFromLinkedSites };
