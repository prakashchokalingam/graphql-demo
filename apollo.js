const express = require('express');
const { createServer } = require('http');
const { ApolloServer } = require('apollo-server-express');
const { SubscriptionServer } = require('subscriptions-transport-ws');

const { makeExecutableSchema } = require('graphql-tools');
const { importSchema } = require('graphql-import');
const { execute, subscribe } = require('graphql');


// mongodb
const Mongoose = require('mongoose');
try {
  Mongoose.connect('mongodb://localhost:27017/todos', { useNewUrlParser: true });
} catch(e) {
  console.log('Connection error:', e);
}


// gql
const typeDefs = importSchema('./apollo/todo.graphql');
const resolvers = require('./apollo/resolver')
const schema = makeExecutableSchema({ typeDefs, resolvers})

const port = 4006;
const wsEndpoint = `ws://localhost:${port}/subscriptions`;
const httpEndpoint = `http://localhost:${port}/graphql`;

const server = new ApolloServer({
  schema,
  playground: {
    subscriptionEndpoint: wsEndpoint
  },
  tracing: true
});

const app = express();
server.applyMiddleware({ app });

//  start server with websocket
const websocket = createServer(app);
websocket.listen(port, () => {
  console.log(`Apollo HTTP Endpoint : ${httpEndpoint}`);
  console.log(`Apollo WS Endpoint : ${wsEndpoint}`);

  new SubscriptionServer({
    execute,
    subscribe,
    schema
  }, {
    server: websocket,
    path: '/subscriptions',
  });
});