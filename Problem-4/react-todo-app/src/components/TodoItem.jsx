import React from "react";

const TodoItem = ({ todo, toggleComplete, deleteTodo }) => {
  return (
    <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <span onClick={() => toggleComplete(todo.id, todo.completed)}>
        {todo.completed ? "✅" : "⬜"} {todo.todo}
      </span>
      <button onClick={() => deleteTodo(todo.id)}>🗑️</button>
    </div>
  );
};

export default TodoItem;
