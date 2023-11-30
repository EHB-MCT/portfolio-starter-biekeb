module.exports = {
  development: {
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING,
    migrations: {
      directory: './migrations', 
    },
  },

    test: {
    client: 'pg',
    connection: process.env.PG_TEST_CONNECTION_STRING || 'your_test_database_connection_string',
    migrations: {
      directory: './migrations',
    },
  },

  
};
