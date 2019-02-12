const Express = require('express');
const Mongoose = require('mongoose');
const ExpressGql = require('express-graphql');
const { buildSchema } = require('graphql');

// mongodb
const TODO = require('./DB/todo');
// connect
try {
  Mongoose.connect('mongodb://localhost:27017/todos', { useNewUrlParser: true });
} catch(e) {
  console.log('Connection error:', e);
}

// Schema
var TodoSchema = buildSchema(`
  type TODO {
    id: ID,
    task: String!,
    completed: Boolean,
    createdAt: String,
    updatedAt: String
  }

  type Query {
    todos(first: Int): [TODO]
    todo(id: ID): TODO
  }

  type Mutation {
    create(task: String!): TODO
    toggle(id: ID): TODO
  }
`);

// resolvers

var resolver = {
  // queries
  todos: ({ first }) => {
    first = first || 10; // default limit 10
    return TODO.find().limit(first);
  },

  todo: async ({ id }) => {
    return await TODO.findById(id);
  },

  // mutation
  create: ({ task }) => {
    return TODO.create({
      task
    });
  },

  toggle: async ({ id }) => {
    let todo = await TODO.findById(id);
    todo.completed = !todo.completed;
    await todo.save();
    return todo;
  }
}

// server
var App = new Express();

App.use('/graphql', ExpressGql({
  schema: TodoSchema,
  rootValue: resolver,
  graphiql: true
}));

let port = 4005;
App.listen(port, () => console.log(`Server started: http://localhost:${port}/graphql`));