export default {
  id: 'youtube',
  label: 'YouTube',

  fields: [
    {
      name: 'id',
      label: 'YouTube Video ID',
      hint:
        'Bara själva ID:t, alltså foj9TYpWAlU om länken är https://youtu.be/foj9TYpWAlU',
    },
  ],
  pattern: /^`\s?youtube: (\S+)\s?`/,
  fromBlock: match => ({
    id: match[1],
  }),
  toBlock: obj => `\`youtube: ${obj.id}\``,
  toPreview: obj =>
    `<img src="http://img.youtube.com/vi/${obj.id}/maxresdefault.jpg" alt="Youtube Video"/>`,
};
