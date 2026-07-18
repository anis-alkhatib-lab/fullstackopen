require('dotenv').config();

const PORT = process.env.PORT || 3003;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is missing from environment variables');
}

module.exports = { PORT, MONGODB_URI };
