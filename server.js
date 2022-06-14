const express = require("express");
const app = express();
const session = require("express-session");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { createServer } = require('http');
const { ApolloServer } = require("apollo-server-express");
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { WebSocketServer } = require('ws');
const { useServer } = require('graphql-ws/lib/use/ws');
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");

const { typeDefs } = require("./Schema/typeDefs");
const { resolvers } = require("./Schema/Resolvers");

const PORT = process.env.PORT || 8000;

const corsOptions = {
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'OPTIONS'],
}

app.use(cors(corsOptions))

const schema = makeExecutableSchema({ typeDefs, resolvers });
const ttpServer = createServer(app);

async function startServer() {
  
  const httpServer = createServer(app);

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });

  const serverCleanup = useServer({ schema }, wsServer);

  await server.start();

  server.applyMiddleware({ app, cors: false });

  httpServer.listen(PORT, () => {
    console.log(`Server on PORT ${PORT}`);
    console.log(`qraphql path is ${server.graphqlPath}`);
  });
}

startServer();
