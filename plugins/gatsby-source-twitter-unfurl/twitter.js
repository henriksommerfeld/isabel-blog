const handle = async function (client, endpoint, options, reporter) {
  try {
    const { params } = options;
    const results = await client.get(endpoint, params);
    return results.length ? results : [results];
  } catch (e) {
    reporter.error(`Error from "${endpoint}" - ${e.message}`);
    console.error(e);
  }
  return [];
};

module.exports = async (client, { endpoint, ...options }, reporter) => {
  reporter.info(`Fetching Twitter ${endpoint} content...`);
  const results = await handle(client, endpoint, options, reporter);
  return results;
};
