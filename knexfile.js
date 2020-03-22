require('dotenv').config();
module.exports = {
  development: {
    client: 'mysql',
    connection: {
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
    },  useNullAsDefault: true

  },
}