import React from "react";

const Filter = ({ filter, setFilter }) => {
  return (
    <div className="filter-buttons">
      <button
        className={filter === "all" ? "active" : ""}
        onClick={() => setFilter("all")}
      >
        📋 All
      </button>
      <button
        className={filter === "completed" ? "active" : ""}
        onClick={() => setFilter("completed")}
      >
        ✅ Completed
      </button>
      <button
        className={filter === "pending" ? "active" : ""}
        onClick={() => setFilter("pending")}
      >
        ⏳ Pending
      </button>
    </div>
  );
};

export default Filter;
