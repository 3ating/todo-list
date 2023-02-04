import React from "react";

function Form({ setInputText, todos, setTodos, inputText, setStatus }) {
    function inputTextHandler(e) {
        setInputText(e.target.value);
    }

    function submitTodoHandler(e) {
        e.preventDefault();
        setTodos([...todos, { text: inputText, completed: false, id: Math.random() * 1000 }]);
        setInputText("");
        fetch("https://yi-todoserver.onrender.com/", {
            method: "POST",
            mode: "no-cors",
            body: JSON.stringify({ text: inputText }),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
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

    function statusHandler(e) {
        setStatus(e.target.value);
    }

    return (
        <form>
            <input
                name='text'
                value={inputText}
                onChange={inputTextHandler}
                type='text'
                className='todo-input'
                placeholder='Add new task..'
            />
            <button onClick={submitTodoHandler} type='submit'>
                <i className='fas fa-plus-square fa-1x'></i>
            </button>
            <div className='select'>
                <select onChange={statusHandler} name='todos' className='filter-todo'>
                    <option value='all'>All</option>
                    <option value='completed'>Completed</option>
                    <option value='uncompleted'>Uncompleted</option>
                </select>
            </div>
        </form>
    );
}

export default Form;
