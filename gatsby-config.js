require('dotenv').config();

const { transformerRemarkParser } = require('./src/transformerRemarkParser');
const remark = require('remark');
const stripMarkdown = require('strip-markdown');

const plugins = [
  {
    // keep as first gatsby-source-filesystem plugin for gatsby image support
    resolve: 'gatsby-source-filesystem',
    options: {
      path: `${__dirname}/static/uploads`,
      name: 'uploads',
    },
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      path: `${__dirname}/src/pages`,
      name: 'pages',
    },
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      path: `${__dirname}/src/img`,
      name: 'images',
    },
  },
  {
    resolve: `gatsby-plugin-scroll-indicator`,
    options: {
      color: '#C53030',
      paths: ['/', '/20*/**', '/om', '/publicerat'],
    },
  },
  {
    resolve: `gatsby-source-twitter-unfurl`,
    options: {
      credentials: {
        consumer_key: `${process.env.TWITTER_CONSUMER_KEY || ''}`,
        consumer_secret: `${process.env.TWITTER_SECRET || ''}`,
        bearer_token: `${process.env.TWITTER_BEARER_TOKEN || ''}`,
      },
      query: {
        endpoint: 'statuses/user_timeline',
        params: {
          screen_name: 'isommerfeld',
          include_rts: true,
          exclude_replies: true,
          tweet_mode: 'extended',
          count: 20,
        },
      },
    },
  },
  {
    resolve: 'gatsby-plugin-sharp',
    options: {
      toFormat: 'WEBP',
    },
  },
  'gatsby-transformer-sharp',
  {
    resolve: 'gatsby-transformer-remark',
    options: {
      engines: {
        yaml: transformerRemarkParser,
      },
      plugins: [
        {
          resolve: 'gatsby-remark-relative-images-v2',
          options: {
            name: 'uploads',
          },
        },
        {
          resolve: 'gatsby-remark-images',
          options: {
            // It's important to specify the maxWidth (in pixels) of
            // the content container as this plugin uses this as the
            // base for generating different widths of each image.
            maxWidth: 1000,
            linkImagesToOriginal: false,
            showCaptions: ['title'],
            withWebp: true,
          },
        },
        {
          resolve: 'gatsby-remark-copy-linked-files',
          options: {
            destinationDir: 'static',
          },
        },
        {
          resolve: `@raae/gatsby-remark-oembed`,
          options: {
            // usePrefix defaults to false
            // usePrefix: true is the same as ["oembed"]
            usePrefix: ['youtube', 'vimeo', 'soundcloud'],
            providers: {
              // Important to exclude providers
              // that adds js to the page.
              // If you do not need them.
              include: ['YouTube', 'Vimeo', 'SoundCloud'],
              exclude: ['Reddit', 'Instagram', 'Flickr', 'Twitter', 'Spotify'],
            },
            settings: {
              // Ex. Show all Twitter embeds with the dark theme
              //Twitter: { theme: 'dark' },
              // Ex. Hide all Instagram comments by default
              Instagram: { hidecaption: true },
            },
          },
        },
        {
          resolve: `gatsby-remark-responsive-iframe`,
          options: {
            wrapperStyle: `margin-bottom: 1.0725rem`,
          },
        },
      ],
    },
  },
  'gatsby-plugin-typescript',
  'gatsby-plugin-catch-links',
  'gatsby-plugin-react-helmet',
  {
    resolve: `gatsby-plugin-typography`,
    options: {
      pathToConfigModule: `src/typography`,
      omitGoogleFont: true,
    },
  },
  {
    resolve: `gatsby-plugin-google-fonts`,
    options: {
      fonts: [
        `Domine`,
        `Open Sans\:400,400i,700,700i`
      ],
      display: 'swap'
    }
  },
  // {
  //   resolve: `gatsby-plugin-prefetch-google-fonts`,
  //   options: {
  //     fonts: [
  //       {
  //         family: `Domine`,
  //         subsets: [`latin`],
  //         variants: [`700`],
  //       },
  //       {
  //         family: `Open Sans`,
  //         variants: ['400', '400i', '700', '700i'],
  //       },
  //     ],
  //   },
  // },
  {
    resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
    options: {
      fields: [`title`, `date`, `tags`, `body`, `excerpt`],
      resolvers: {
        MarkdownRemark: {
          title: (node) => node.frontmatter.title,
          date: (node) => node.frontmatter.date,
          tags: (node) => node.frontmatter.tags,
          path: (node) => node.fields.slug,
          body: (node) =>
            remark().use(stripMarkdown).processSync(node.rawMarkdownBody)
              .contents,
          excerpt: (node) => {
            const text = remark()
              .use(stripMarkdown)
              .processSync(node.rawMarkdownBody).contents;

            const excerptLength = 140;
            return String(text).substring(0, excerptLength) + '...';
          },
        },
      },
      // Optional filter to limit indexed nodes
      filter: (node) =>
        node.frontmatter.hidden !== true &&
        node.frontmatter.title !== 'Startsidan',
    },
  },
  'gatsby-plugin-styled-components',
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `Isabel Sommerfelds personliga sajt`,
      short_name: `Isabel`,
      start_url: `/`,
      background_color: `#2D3748`,
      theme_color: `#2D3748`,
      display: `browser`,
      icon: `static/img/favimage.jpg`,
    },
  },
  'gatsby-plugin-offline',
  {
    resolve: `gatsby-plugin-disqus`,
    options: {
      shortname: `isabelswebb`,
    },
  },
  'gatsby-plugin-netlify-cache',
  {
    resolve: 'gatsby-plugin-netlify-cms',
    options: {
      modulePath: `${__dirname}/src/cms/cms.js`,
      manualInit: true,
      enableIdentityWidget: true,
      htmlTitle: 'Redaktörsläge - Isabels sajt',
      htmlFavicon: `${__dirname}/static/img/edit-filled.ico`,
    },
  },
  'gatsby-plugin-netlify', // make sure to keep it last in the array
];

module.exports = {
  plugins: plugins,
};
