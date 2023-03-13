import React, { useEffect } from "react";
import "./styles.css";
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, deleteTodo, toggleTodoMark, todosSelector } from '../../reducers/todos';
import TodoListItem from "components/TodoListItem";

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector(todosSelector);

  useEffect(() => {
    //Get todos once component mounted
    dispatch(fetchTodos());
  }, []);

  const handleDelete = (todoId) => {
    // Fix an ability to delete task
    dispatch(deleteTodo(todoId));
  };

  const toggleCheck = (todoId, isChecked) => {
    // Fix an ability to toggle task
    dispatch(toggleTodoMark({ id: todoId, checked: !isChecked }));
  };


  return (
    <div className="todo-list">
      <span className="todo-list-title">Things to do:</span>
      {
        todos.length > 0
          ?
          <div className="todo-list-content">
            {todos.map(todo =>
              <TodoListItem
                checked={todo.checked}
                label={todo.label}
                key={todo.id}
                onCheck={() => toggleCheck(todo.id, todo.checked)}
                onDelete={() => handleDelete(todo.id)}
              ></TodoListItem>
            )}
          </div>

          :
          <div className="no-todos">
            Looks like you&apos;re absolutely free today!
          </div>
      }
    </div>
  );
};

export default TodoList;
