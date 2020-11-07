import React from "react";
import TodosList from "./TodosList";
import Header from "./Header";
import InputTodo from "./InputTodo";
// import uuid from "uuid";
import { v4 as uuidv4 } from "uuid";

class TodoContainer extends React.Component {
  state = {
    todos: [
      {
        // id: uuid.v4(),
        id: uuidv4(),
        title: "Setup development environment",
        completed: false,
      },
      {
        // id: uuid.v4(),
        id: uuidv4(),
        title: "Develop website and add content",
        completed: false,
      },
      {
        // id: uuid.v4(),
        id: uuidv4(),
        title: "Deploy to live server",
        completed: false,
      },
    ],
    completedTodos: [],
  };

  handleChange = (id) => {
    const clickedTodoItemIdex = this.state.todos.findIndex((todo) => {
      return todo.id == id;
    });
    const clickedCompletedTodoItemIdex = this.state.completedTodos.findIndex((todo) => {
      return todo.id == id;
    });
    if (clickedTodoItemIdex >= 0) {
      const completedTodoItem = this.state.todos[clickedTodoItemIdex];
      completedTodoItem.completed = true;
      this.setState({
        todos: [
          ...this.state.todos.filter((todo) => {
            return todo.id !== id;
          }),
        ],
        completedTodos: [...this.state.completedTodos, completedTodoItem],
      });
      console.log(completedTodoItem);
    }
    if (clickedCompletedTodoItemIdex >= 0) {
      const unCompletedTodoItem = this.state.todos[clickedCompletedTodoItemIdex];
      unCompletedTodoItem.completed = false;
      this.setState({
        todos: [
          ...this.state.todos, unCompletedTodoItem
        ],
        completedTodos: [
          ...this.state.completedTodos.filter((completedTodo) => {
            return completedTodo.id !== id;
          })
        ]
      });
    }
  };

  delTodo = (id) => {
    this.setState({
      todos: [
        ...this.state.todos.filter((todo) => {
          return todo.id !== id;
        }),
      ],
    });
  };

  addTodoItem = (title) => {
    const newTodo = {
      // id: uuid.v4(),
      id: uuidv4(),
      title: title,
      completed: false,
    };
    this.setState({
      todos: [...this.state.todos, newTodo],
    });
  };

  render() {
    return (
      <div className="container">
        <Header />
        <InputTodo addTodoProps={this.addTodoItem} />
        <TodosList
          todos={this.state.todos}
          handleChangeProps={this.handleChange}
          deleteTodoProps={this.delTodo}
        />
        <h1>Completed Tasks</h1>
        <TodosList
          todos={this.state.completedTodos}
          handleChangeProps={this.handleChange}
          deleteTodoProps={this.delTodo}
        />
      </div>
    );
  }
}
export default TodoContainer;
