import React from "react";

function Todo({ index, text, todo, todos, setTodos }) {
    function deleteItem() {
        setTodos(todos.filter((element) => element.id !== todo.id));

        fetch("https://yi-todoserver.onrender.com/", {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: todo.id }),
        })
            .then((res) => {
                if (res.ok) {
                    console.log("HTTP request successful");
                } else {
                    console.log("HTTP request unsuccessful");
                }
                return res;
            })
            .then((res) => res.json())
            .catch((error) => console.log(error));
    }

    function completeHandler() {
        setTodos(
            todos.map((item) => {
                if (item.id === todo.id) {
                    return {
                        ...item,
                        completed: !item.completed,
                    };
                }
                return item;
            })
        );

        fetch("https://yi-todoserver.onrender.com/", {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                id: todo.id,
                completed: !todo.completed,
            }),
        })
            .then((response) => {
                console.log(response);
                return response.json();
            })
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log("Error Reading data " + err);
            });
    }

    return (
        <div className='todo'>
            <li name='text' className={`todo-item ${todo.completed ? "completed" : ""}`}>
                {text}
            </li>
            <button onClick={completeHandler} className='complete-btn'>
                <i className='fas fa-check'></i>
            </button>

            <button onClick={deleteItem} className='trash-btn'>
                <i className='fas fa-trash'></i>
            </button>
        </div>
    );
}

export default Todo;
