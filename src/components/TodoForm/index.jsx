import React, { useState } from 'react';
import './styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, changeNewTodoLabel, newTodoLabelSelector } from 'reducers/todos';

const TodoForm = () => {
    const dispatch = useDispatch();
    const newTodoLabel = useSelector(newTodoLabelSelector); //State from store for input field

    const handleNewTodoLabelChange = (e) => {
        const value = e.target.value;
        dispatch(changeNewTodoLabel(value));
    };

    const handleNewTodo = (event) => {
        event.preventDefault();
        dispatch(addTodo(newTodoLabel));
    };

    return (
        <form
            className='todo-form-container'
            onSubmit={handleNewTodo}
            action='#'
        >
            <input
                className='todo-form-input'
                required
                placeholder='Enter new to do'
                type='text'
                name='todoLabel'
                onChange={handleNewTodoLabelChange}
                value={newTodoLabel}
            />
            <button
                className='todo-form-button'
            >
                ADD TO DO
            </button>
        </form>
    );
};

export default TodoForm;