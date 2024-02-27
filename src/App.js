import React from "react";

const initialState = {
    count: 0,
    todos: [
        {id: 12, todo: 'Help myself', isCompleted: true},
        {id: 13, todo: 'Help for father', isCompleted: false},
        {id: 14, todo: 'Help mother', isCompleted: true},
    ]
}

const countReducer = (state, {type, payload}) => {
    console.log(payload)
    switch (type){
        case 'INCREMENT':
            return {count: state.count + 1}
        case 'UMNOPJITNACHISLO':
            return {count: state.count * payload}
        case 'ADD-TODO':
            const newTodo = {id: Date.now(), todo: payload, isCompleted: false}
            return {todos: [...state.todos, newTodo] }
        case 'DELETETODO': 
            const filteredTodos = state.todos.filter( item => item.id !== payload)
            return { todos: [...filteredTodos]}
        case 'CHANGEVALUE':
            const changedTodos = state.todos.map( item => item.id == payload ? 
                {...item, isCompleted: !item.isCompleted} : item)
            return { todos: [...changedTodos]}

    }
}

function App() {
    const [state, dispatch] = React.useReducer(countReducer, initialState)
    const [text, setText] = React.useState('')
    return (
        <>
            <div className="App">
                <button><h1>-</h1></button>
                <h1>{state.count}</h1>
                <button
                    onClick={ () => dispatch({type: 'INCREMENT'})}
                ><h1>+</h1></button>
                <button
                    onClick={ () => dispatch({type: 'UMNOPJITNACHISLO', payload: 32})}
                ><h1>x32</h1></button>
            </div>
            <div className="todo-wrapper">
                <div className="todo-interactive">
                    <input 
                        onChange={ (e) => setText(e.target.value)}
                        type="text" />
                    <button
                        onClick={ () => dispatch({type: 'ADD-TODO', payload: text})}
                    >Add todo</button>
                </div>
                <div className="todo-list">
                    {
                        state.todos.length === 0 ? <h1>Todos array is empty</h1> :
                        state.todos.map( item => (
                            <div className="todo">
                                <input 
                                    checked={item.isCompleted}
                                    onChange={() => dispatch({type: 'CHANGEVALUE', payload: item.id})}
                                    type="checkbox" />
                                <h5 className={item.isCompleted && 'ended'}>{item.todo}</h5>
                                <button
                                    onClick={ () => dispatch({type: 'DELETETODO', payload: item.id})}
                                > &#x2715; </button>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
}

export default App;
