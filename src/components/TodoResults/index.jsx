import React from "react";
import { useSelector } from "react-redux";
import { todosSelector } from "reducers/todos";
import "./styles.css";

const TodoResults = () => {
  // Fix an ability to calculate completed tasks
  const todos = useSelector(todosSelector);
  //TODO: maybe refactor this and use redux or an state
  const doneCount = todos.reduce((prev, cur) => {
    if (cur.checked) {
      return prev + 1;
    } else {
      return prev;
    }
  }, 0);

  return <div className="todo-results">Done:{doneCount}</div>;
};

export default TodoResults;
