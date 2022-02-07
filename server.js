const express = require("express");
const app = express();
const { ApolloServer } = require("apollo-server-express");

const { typeDefs } = require("./Schema/typeDefs");
const { resolvers } = require("./Schema/Resolvers");

const PORT = process.env.PORT || 8000;

async function startServer() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });
  app.listen(PORT, () => {
    console.log(`Server on PORT ${PORT}`);
    console.log(`qraphql path is ${server.graphqlPath}`);
  });
}

startServer();
