import {TodoItem} from "../../types/TodoItem.ts";
import React from 'react';
import './TodoInput.css';
import _ from 'lodash';

interface TodoInputProps {
    addTodo: (todoItem: TodoItem) => void;
}

export const TodoInput = ({addTodo}: TodoInputProps) => {
    const [newTodo, setNewTodo] = React.useState<TodoItem>({
        id: _.uniqueId(),
        text: '',
        timeStamp: 0
    });

    const handleAddTodo = () => {
        if (newTodo.text.trim().length > 0) {
            setNewTodo({
                id: _.uniqueId(),
                text: '',
                timeStamp: 0
            });
            addTodo(newTodo);
        }
    }

    return (
        <div className="todo-input-container">
            <input
                type="text"
                value={newTodo.text}
                onChange={e => {
                    setNewTodo({
                        id: newTodo.id,
                        text: e.target.value,
                        timeStamp: 0
                    });
                }}
                placeholder="Add a new todo"
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        handleAddTodo()
                    }
                }}
                className={'todo-input'}
            />
            <button onClick={() => handleAddTodo()}>Add Todo</button>
        </div>
    );
}