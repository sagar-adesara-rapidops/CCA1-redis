// checkFolderByProviderId
function makeCheckFolderByProviderId({ selectFolderByProviderIdFromDb }) {
  return async function checkFolderByProviderId({
    databaseName,
    providerId,
    userId,
  }) {
    try {
      console.log("Inside check if fold exists by providerId file");

      let [result, fields] = await selectFolderByProviderIdFromDb({
        databaseName,
        userId,
        providerId,
      });
      if (result.length) {
        throw new Error("Provider Id Already Used");
      }
    } catch (err) {
      throw err;
    }
  };
}
module.exports = makeCheckFolderByProviderId;
