const get = require('lodash.get');

const twitterProperties = {
  profileImage: 'user.profile_image_url_https',
  retweetedProfileImage: 'retweeted_status.user.profile_image_url_https',
  linkedSiteImage: 'linked_site.image',
  uploadedMedia: 'entities.media[0].media_url_https',
  retweetedUploadedMedia: 'retweeted_status.entities.media[0].media_url_https',
};

const saveKeyTemplates = {};
saveKeyTemplates[twitterProperties.profileImage] = 'profile-{user.id}';
saveKeyTemplates[twitterProperties.retweetedProfileImage] =
  'rt-profile-{retweeted_status.user.id}';
saveKeyTemplates[twitterProperties.linkedSiteImage] = 'preview-{id_str}';
saveKeyTemplates[twitterProperties.uploadedMedia] = 'photo-{id_str}';
saveKeyTemplates[twitterProperties.retweetedUploadedMedia] = 'retweeted-photo-{id_str}';

function getValueForProperty(tweet, property) {
  return get(tweet, property, '');
}

function getSaveKey(tweet, saveKeyTemplate) {
  if (!saveKeyTemplate.includes('{') || !saveKeyTemplate.includes('}'))
    return saveKeyTemplate;
  const curlyBracketStartParts = saveKeyTemplate.split('{');
  const prefix = curlyBracketStartParts[0];
  const curlyBracketEndParts = curlyBracketStartParts[1].split('}');
  const toReplace = curlyBracketEndParts[0];
  const value = getValueForProperty(tweet, toReplace);

  return prefix + value;
}

module.exports = {
  twitterProperties,
  saveKeyTemplates,
  getSaveKey,
  getValueForProperty,
};
