import axios from "axios";

const BASE_URL = 'https://my-json-server.typicode.com/AlvaroArratia/static-todos-api/todos';

const getTodos = async () => {
    const r = await axios.get(BASE_URL);
    return r.data;
};

const addTodo = async (newTodoLabel) => {
    const r = await axios.post(BASE_URL, { label: newTodoLabel, checked: false });
    return r.data;
};

const toggleTodoMark = async (id, checked) => {
    const r = await axios.patch(`${BASE_URL}/${id}`, { checked });
    return r.data;
};

const deleteTodo = async (id) => {
    const r = await axios.delete(`${BASE_URL}/${id}`);
    return r.data;
};

export default {
    getTodos,
    addTodo,
    toggleTodoMark,
    deleteTodo
};