import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Form from "./components/Form";
import TodoList from "./components/TodoList";
import Theme from "./components/Theme";
import "./App.css";

function App() {
    const [inputText, setInputText] = useState("");
    const [todos, setTodos] = useState([]);
    const [status, setStatus] = useState("all");
    const [filteredTodos, setFilteredTodos] = useState([]);
    const storedDark = Cookies.get("dark");
    const [dark, setDark] = useState(() => {
        if (storedDark) {
            return true;
        } else if (!storedDark) {
            return false;
        }
        return true;
    });

    useEffect(() => {
        getLocalTodos();
    }, []);

    useEffect(() => {
        filterHandler();
        saveLocalTodos();
    }, [todos, status]);

    function filterHandler() {
        switch (status) {
            case "completed":
                setFilteredTodos(todos.filter((todo) => todo.completed));
                break;
            case "uncompleted":
                setFilteredTodos(todos.filter((todo) => !todo.completed));
                break;
            default:
                setFilteredTodos(todos);
                break;
        }
    }

    function saveLocalTodos() {
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    function getLocalTodos() {
        if (localStorage.getItem("todos") === null) {
            localStorage.setItem("todos", JSON.stringify([]));
        } else {
            var todoLocal = JSON.parse(localStorage.getItem("todos"));
            setTodos(todoLocal);
        }
    }

    return (
        <div className='container'>
            <header>
                <h1>ToDo List</h1>
            </header>
            <Theme dark={dark} setDark={setDark} storedDark={storedDark} />
            <Form
                inputText={inputText}
                todos={todos}
                setTodos={setTodos}
                setInputText={setInputText}
                setStatus={setStatus}
                saveLocalTodos={saveLocalTodos}
            />
            <TodoList todos={todos} setTodos={setTodos} filteredTodos={filteredTodos} />
        </div>
    );
}

export default App;
