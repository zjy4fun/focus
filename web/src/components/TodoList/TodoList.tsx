import { useRef, useState } from "react";
import "./TodoList.css";
import type { TodoItem } from "../../types/TodoItem.ts";
import { formatTime } from "../../utils/time.ts";

interface TodoListProps {
  todos: TodoItem[];
  setTodos: (todos: TodoItem[]) => void;
  currentTodo: TodoItem | null;
  setCurrentTodo: (todoItem: TodoItem) => void;
  handleStartPress: (event: React.MouseEvent<HTMLButtonElement>, todo: TodoItem) => void;
  deleteTodo: (todoItem: TodoItem) => void;
}

export const TodoList = ({
  todos,
  currentTodo,
  handleStartPress,
  deleteTodo,
}: TodoListProps) => {
  const [selectedTodo, setSelectedTodo] = useState<TodoItem | null>(null);
  const newTodoRef = useRef<HTMLInputElement>(null);

  return (
    <div className="todo-list-container">
      <div className="todo-items">
        {todos.map((todo, index) => (
          <div
            key={index}
            ref={index === todos.length - 1 ? newTodoRef : null}
            className={`todo-item ${
              selectedTodo?.id === todo.id ? "selected" : ""
            }`}
            onClick={() => setSelectedTodo(todo)}
          >
            {formatTime(todo.timeStamp)}
            {"    -    "}
            {todo.text}
            <div className={"btn-container"}>
              <button
                onClick={(event) => {
                  handleStartPress(event as React.MouseEvent<HTMLButtonElement>, todo);
                }}
                className={`start-button ${
                  currentTodo?.id === todo.id ? "stop" : ""
                }`}
              >
                {currentTodo?.id === todo.id ? "Stop" : "Start"}
              </button>
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  deleteTodo(todo);
                }}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
