import React, { useEffect } from "react";
import TodoList from "./components/TodoList";
import TodoResults from "./components/TodoResults";
import TodoForm from "components/TodoForm";
import "./App.css";
import { ToastContainer, toast, Flip } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { statusSelector, resetStatus } from "reducers/todos";

const App = () => {
  const status = useSelector(statusSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'idle')
      toast.dismiss();

    if (status === 'rejected') {
      toast.dismiss();
      toast.error('Error al conectar con API', {
        theme: "dark",
      });
    }

    if (status === 'pending')
      toast.loading('Cargando',{
        transition: Flip
      });

  }, [status]);

  return (
    <div className="root">
      <TodoList />
      <TodoResults />
      <TodoForm />
      <ToastContainer
        position="bottom-center"
        autoClose={false}
        hideProgressBar
      />
    </div>
  );
};

export default App;
