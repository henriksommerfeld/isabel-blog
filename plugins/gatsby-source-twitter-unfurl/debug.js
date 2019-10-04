'use strict';

const fs = require(`fs`);

function saveResult(results) {
  fs.writeFileSync(`./tweets.json`, JSON.stringify(results, null, 4), {
    encoding: `utf8`,
  });
}

module.exports = {
  saveResult,
};
