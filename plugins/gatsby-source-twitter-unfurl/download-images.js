const download = require('image-downloader');
const fs = require('fs');
const path = require('path');
const get = require('lodash.get');

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
    const profileImgUrl = get(tweet, 'user.profile_image_url_https', '');
    const profileImageUrl = getBiggerImageUrl(profileImgUrl);

    const retweetedImgUrl = get(
      tweet,
      'retweeted_status.user.profile_image_url_https',
      ''
    );
    const rtUserId = get(tweet, 'retweeted_status.user.id', '');
    const retweetedImageUrl = getBiggerImageUrl(retweetedImgUrl);
    const linkedImgUrl = get(tweet, 'linked_site.image', '');
    const hasPhoto = get(tweet, 'entities.media[0].type', '') === 'photo';
    const photoUrl = hasPhoto
      ? get(tweet, 'entities.media[0].media_url_https', '')
      : '';

    await fetchImage(profileImageUrl, `profile-${tweet.user.id}`, reporter);
    await fetchImage(retweetedImageUrl, `rt-profile-${rtUserId}`, reporter);
    await fetchImage(linkedImgUrl, `preview-${tweet.id_str}`, reporter);
    await fetchImage(photoUrl, `photo-${tweet.id_str}`, reporter);

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
