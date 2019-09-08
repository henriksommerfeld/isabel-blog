const { transformerRemarkParser } = require('./src/transformerRemarkParser');

module.exports = {
  siteMetadata: {
    title: 'Isabel Sommerfeld',
    description: 'Bellas blogg',
  },
  plugins: [
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

    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        engines: {
          yaml: transformerRemarkParser,
        },
        plugins: [
          {
            resolve: 'gatsby-remark-relative-images',
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
              quality: 80,
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static',
            },
          },
          {
            resolve: 'gatsby-remark-video',
            options: {
              width: '100%',
              height: 'auto',
              preload: 'auto',
              muted: true,
              autoplay: false,
              loop: false,
              controls: true,
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
                exclude: [
                  'Reddit',
                  'Instagram',
                  'Flickr',
                  'Twitter',
                  'Spotify',
                ],
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
    'gatsby-plugin-react-helmet',

    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/typography`,
        omitGoogleFont: false,
      },
    },
    'gatsby-plugin-styled-components',
    'gatsby-plugin-netlify-cache',
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
        manualInit: true,
        enableIdentityWidget: true,
        htmlTitle: 'Redaktörsläge - Isabels sajt',
        htmlFavicon: `${__dirname}/static/favicon.ico`,
      },
    },
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
};
