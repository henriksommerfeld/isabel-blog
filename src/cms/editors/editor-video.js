export default {
  id: 'video',
  label: 'Video',

  fields: [
    {
      name: 'url',
      label: 'Länk',
      hint: 'Länk till video-fil som kan spelas upp på webben',
    },
  ],
  pattern: /^`\s?video: (\S+)\s?`/,
  fromBlock: match => ({
    url: match[1],
  }),
  toBlock: obj => `\`video: ${obj.url}\``,
  toPreview: obj => `<video controls preload="metadata" style="width: 100%">
      <source src="${obj.url}" >
    </video>`,
};
