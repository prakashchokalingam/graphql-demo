
// mongodb
const TODO = require('../DB/todo');

const { PubSub } = require('graphql-subscriptions');
const realtime = new PubSub();

module.exports = {
  Query: {
    todos: (root, { first }) => {
      return TODO.find().limit(first);
    },

    todo: async (root, { id }) => {
      return await TODO.findById(id);
    }
  },

  Mutation: {
    create: async (root, { task }) => {
      let todo = await TODO.create({
        task
      });

      let payload = {
        taskCreated: todo
      }
      realtime.publish('taskCreated', payload);
      return todo;
    },

    toggle: async (root, { id }) => {
      let todo = await TODO.findById(id);
      todo.completed = !todo.completed;
      await todo.save();

      let payload = {
        taskUpdated: todo
      }
      realtime.publish('taskUpdated', payload);
      return todo;
    }
  },

  Subscription: {
    taskUpdated: {
      subscribe: () => realtime.asyncIterator('taskUpdated')
    },
    taskCreated: {
      subscribe: () => realtime.asyncIterator('taskCreated')
    }
  }
};