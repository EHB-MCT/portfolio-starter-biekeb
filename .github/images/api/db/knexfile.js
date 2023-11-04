module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'your_username',
      password: 'your_password',
      database: 'usersApi',
    },
    migrations: {
      directory: './migrations',
    },
    seeds: {
      directory: './seeds',
    },
  },
};
