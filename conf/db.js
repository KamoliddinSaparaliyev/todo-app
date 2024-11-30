const mongoose = require("mongoose");

/**
 * -------------- DATABASE ----------------
 */

/**
 * Connect to MongoDB Server using the connection string in the `.env` file.  To implement this, place the following
 * string into the `.env` file
 *
 * DB_STRING_DEV=mongodb://<user>:<password>@localhost:27017/database_name
 * DB_STRING_PROD=<your production database string>
 */

const uri =
  process.env.NODE_ENV === "production"
    ? process.env.DB_STRING_PROD
    : process.env.DB_STRING_DEV;

if (!uri) {
  console.error("MongoDB connection string is not provided");
  process.exit();
}
// Connect to the correct environment database

module.exports = mongoose.connect(uri);
