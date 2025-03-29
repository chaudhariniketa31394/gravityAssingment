import React, { useState, useEffect } from "react";
import AddTodo from "./AddTodo";
import Filter from "./Filter";
import TodoList from "./TodoList";

const API_URL = "https://dummyjson.com/todos";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch(`${API_URL}?limit=10`);
      const data = await response.json();
      setTodos(data.todos);
      localStorage.setItem("todos", JSON.stringify(data.todos));
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async (text) => {
    if (!text.trim()) return;
    const newTodo = { todo: text, completed: false, userId: 1 };

    try {
      const response = await fetch(API_URL + "/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo),
      });
      const result = await response.json();
      setTodos([...todos, result]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !completed }),
      });
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  return (
    <div className="container">
      <h1>📌 API Integrated Todo List</h1>
      <AddTodo addTodo={addTodo} />
      <Filter filter={filter} setFilter={setFilter} />
      <TodoList
        todos={filteredTodos}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
      />
    </div>
  );
};

export default TodoApp;
