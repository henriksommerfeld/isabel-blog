const download = require('image-downloader');
const fs = require('fs');
const path = require('path');

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

async function fetchImagesFromTweet(tweet, reporter) {
  try {
    const imgUrl = (tweet.user && tweet.user.profile_image_url_https) || '';
    const profileImageUrl = getBiggerImageUrl(imgUrl);

    await fetchImage(profileImageUrl, reporter);

    return tweet;
  } catch (error) {
    reporter.warn('Failed to fetch images for tweet', error);
    return tweet;
  }
}

function getFilenameFromPath(fullPath) {
  return fullPath.replace(/^.*[\\\/]/, '');
}

async function fetchImage(imageUrl, reporter) {
  try {
    if (!imageUrl) return false;

    const imageFolderPath = '/uploads/twitter';
    const relativeImageFolderPath = `../../static${imageFolderPath}`;
    const fullPath = path.join(__dirname, relativeImageFolderPath);
    const imageFilename = getFilenameFromPath(imageUrl);
    const distinationPath = `${fullPath}/${imageFilename}`;

    if (fs.existsSync(distinationPath)) {
      return `${imageFolderPath}/${imageFilename}`;
    }

    const options = {
      url: imageUrl,
      dest: fullPath,
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
