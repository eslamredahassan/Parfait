const { MongoClient } = require("mongodb");
// Replace the uri string with your connection string.;

module.exports = async (client, config) => {
  await MongoClient.connect(database)
    .then(() => {
      console.log("Connect to database");
    })
    .catch((error) => {
      console.log("Unable to connect to database");
    });
};
