import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import todoServices from '../services/todos';

//Reducer for pending and rejected status in API requests thunks:
const statusReducer = (status) => (state, action) => {
    state.status = status;
    return state;
};

//main todos store slice:
const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        list: [], //contains todo list
        status: 'idle', //requests status 
        newTodoLabel: '', //state for new todo controlled input field
    },
    reducers: {
        changeNewTodoLabel(state, action) {
            state.newTodoLabel = action.payload;
            return state;
        }
    },
    extraReducers: builder => {
        builder
            //READ:
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.list = action.payload;
                state.status = 'idle';
                return state;
            })
            .addCase(fetchTodos.pending, statusReducer('pending'))
            .addCase(fetchTodos.rejected, statusReducer('rejected'))
            //ADD:
            .addCase(addTodo.fulfilled, (state, action) => {
                state.list.push(action.payload);
                state.status = 'idle';
                state.newTodoLabel = '';
                return state;
            })
            .addCase(addTodo.pending, statusReducer('pending'))
            .addCase(addTodo.rejected, statusReducer('rejected'))
            //UPDATE:
            .addCase(toggleTodoMark.fulfilled, (state, action) => {
                const toUpdateTodo = state.list.find(todo => todo.id === action.payload.id);
                toUpdateTodo.checked = action.payload.checked;
                state.status = 'idle';
                return state;
            })
            .addCase(toggleTodoMark.pending, statusReducer('pending'))
            .addCase(toggleTodoMark.rejected, statusReducer('rejected'))
            //DELETE:
            .addCase(deleteTodo.fulfilled, (state, action) => {
                const toDeleteTodo = state.list.find(todo => todo.id === action.payload);
                const indexToDelete = state.list.indexOf(toDeleteTodo);
                state.list.splice(indexToDelete, 1);
                state.status = 'idle';
                return state;
            })
            .addCase(deleteTodo.pending, statusReducer('pending'))
            .addCase(deleteTodo.rejected, statusReducer('rejected'));
    }
});

//Thunks for CRUD operations using API:
const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    return await todoServices.getTodos();

});

const addTodo = createAsyncThunk('todos/addTodo', async (newTodoLabel) => {
    return await todoServices.addTodo(newTodoLabel);
});

const toggleTodoMark = createAsyncThunk('todos/toggleTodoMark', async (params) => {
    const { id, checked } = params;
    return await todoServices.toggleTodoMark(id, checked);
});

const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
    await todoServices.deleteTodo(id);
    return id;
});

//Exporting actions and thunk functions:
const { changeNewTodoLabel } = todosSlice.actions;
export {
    fetchTodos,
    addTodo,
    toggleTodoMark,
    deleteTodo,
    changeNewTodoLabel
};

//Exporting selectors:
export const todosSelector = state => {
    return state.todos.list;
};

export const statusSelector = state => {
    return state.todos.status;
};

export const newTodoLabelSelector = state => {
    return state.todos.newTodoLabel;
};

// Exporting slice reducer:
export default todosSlice.reducer;
