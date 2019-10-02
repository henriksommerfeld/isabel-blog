module.exports = async (client, { endpoint, ...options }, reporter) => {
  const handle = async function(client, endpoint, { params }) {
    try {
      const results = await client.get(endpoint, params);
      return results.length ? results : [results];
    } catch (e) {
      reporter.error(`Error from "${endpoint}" - ${e.message}`);
      console.error(e);
    }
    return [];
  };

  reporter.info(`Fetching Twitter ${endpoint} content...`);

  const results = await handle(client, endpoint, options);

  return results;
};
