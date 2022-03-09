const express = require("express");
const app = express();
const session = require("express-session");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { ApolloServer } = require("apollo-server-express");

const { typeDefs } = require("./Schema/typeDefs");
const { resolvers } = require("./Schema/Resolvers");

const PORT = process.env.PORT || 8000;

// var corsOptions = {
//   origin: "http://localhost:8100",
//   credentials: true, // <-- REQUIRED backend setting
// };
//

app.use(cookieParser());

app.use(
  session({
    name: "qid",
    secret: "gerg43r",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    },
  })
);

const corsOptions = {
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'OPTIONS'],
}

app.use(cors(corsOptions))

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }),
  });
  await server.start();
  server.applyMiddleware({ app, cors: corsOptions });

  app.listen(PORT, () => {
    console.log(`Server on PORT ${PORT}`);
    console.log(`qraphql path is ${server.graphqlPath}`);
  });
}

startServer();
