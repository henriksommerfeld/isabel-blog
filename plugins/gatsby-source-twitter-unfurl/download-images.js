const download = require('image-downloader');
const fs = require('fs');
const path = require('path');
const twitterDownloadsConfig = require('./download-config');

async function fetchImagesFromTweets(tweets, reporter) {
  try {
    const updatedTweetsPromises = tweets.map(async tweet =>
      fetchImagesFromTweet(tweet, reporter)
    );

    return Promise.all(updatedTweetsPromises);
  } catch (error) {
    reporter.warn(error);
  }
}

function getBiggerImageUrl(url) {
  return url.replace('_normal.', '_bigger.');
}

function isProfileImage(property) {
  return (
    property === twitterDownloadsConfig.profileImage ||
    property === twitterDownloadsConfig.retweetedProfileImage
  );
}

async function fetchImagesFromTweet(tweet, reporter) {
  try {
    const templates = twitterDownloadsConfig.saveKeyTemplates;
    Object.keys(templates).forEach(async key => {
      let imageUrl = twitterDownloadsConfig.getValueForProperty(tweet, key);

      if (isProfileImage(path.property)) {
        imageUrl = getBiggerImageUrl(imageUrl);
      }

      const saveKey = twitterDownloadsConfig.getSaveKey(tweet, templates[key]);

      await fetchImage(imageUrl, saveKey, reporter);
    });

    return tweet;
  } catch (error) {
    reporter.warn('Failed to fetch images for tweet', error);
    return tweet;
  }
}

async function fetchImage(imageUrl, saveWithName, reporter) {
  try {
    if (!imageUrl) return false;

    const imageFolderPath = '/uploads/twitter';
    const relativeImageFolderPath = `../../static${imageFolderPath}`;
    const fullPath = path.join(__dirname, relativeImageFolderPath);
    const imageFilename = `${saveWithName}.jpg`;
    const distinationPath = `${fullPath}/${imageFilename}`;

    if (fs.existsSync(distinationPath)) {
      return `${imageFolderPath}/${imageFilename}`;
    }

    const options = {
      url: imageUrl,
      dest: distinationPath,
      extractFilename: false,
    };

    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath);
    }

    await download.image(options);

    return true;
  } catch (error) {
    reporter.warn('Failed to fetch image for tweet', error);
    return false;
  }
}

module.exports = { fetchImagesFromTweets };
