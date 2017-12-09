require('dotenv').config();
//loads environment variables from a .env file into process.env
const cfg = {};
//cfg.authyKey = process.env.AUTHY_API_KEY;
cfg.tokenSecretKey = process.env.TOKEN_SECRET_KEY;
cfg.mongoUrl = process.env.MONGO_URL;
module.exports = cfg;


