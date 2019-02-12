<template>
  <div class="todo">
    <h1>Todo using Graphql</h1>

    <div class="todo-wrapper">

      <div class="new-todo">
        <input type="text" placeholder="Enter tasks here..." @keydown.enter="createdTodo" required>
      </div>

      <div class="todo-item" v-for="todo in todos" :key="todo.id" :class="{'done': todo.completed}">
        <div class="task" >{{todo.task}}</div>
      </div>
    </div>

  </div>
</template>

// js
<script>
import gql from 'graphql-tag';

export default {
  apollo: {
    todos: gql`{todos {
        id,
        task,
        completed
      }
    }`,

    $subscribe: {
      taskCreated: {
        query: gql`subscription taskCreated {
          taskCreated {
            id,
            task,
            completed
          }
        }`,
        result ({ data: { taskCreated }}) {
          this.todos.push(taskCreated);
        }
      },
    }
  },

  data () {
    return {
      todos: []
    }
  },

  methods: {
    createdTodo (e) {
      let task = e.currentTarget.value;
      e.currentTarget.value = '';

      this.$apollo.mutate({
        mutation: gql`mutation ($task: String!) {
          create(task: $task) {
            id
          }
        }`,
        variables: {
          task
        }
      }).then((data) => {
        console.log(data);
      });

    }
  }
}
</script>

// style
<style lang="css" scoped>
  .todo {
    text-align: center;
    padding: 50px;
  }

  .todo-item {
    border: 2px solid orange;
    padding: 10px;
    margin: 5px 50px;
    font-size: 1.5em;
  }

  .todo-item.done {
    border: 2px solid green;
  }

  .new-todo {
    border: 1px solid lightskyblue;
    margin: 5px 50px;
  }

  .new-todo input {
    width: 80%;
    height: 40px;
    outline: none;
    border: none;
    font-size: 2em;
    text-align: center
  }
</style>
