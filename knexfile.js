// Update with your config settings.

module.exports = {
  development: {
    client: 'postgresql',
connection:'postgres://wrxxebozkbzjie:3f552889987af27301244414e54f8e36ebafbe220e975c269edd9bf816ae2aa6@ec2-23-21-244-254.compute-1.amazonaws.com:5432/d5av1dursm76cb'
    //connection: 'postgres://postgres:postgres@localhost/my_life'
  // connection: 'postgres://postgres:postgres@localhost/postgres'
  },
  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL + '?ssl=true'
  }
};
