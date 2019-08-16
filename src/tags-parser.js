exports.getUniqueTags = tags => {
  if (!tags || !tags.length) return [];
  if (typeof tags === 'string') return [tags];

  const nonEmptyTags = tags.filter(x => x);
  const distinctTags = [...new Set(nonEmptyTags)];

  return distinctTags;
};
